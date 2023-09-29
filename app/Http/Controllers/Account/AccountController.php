<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Service\ServiceHandle;
use App\Http\Requests\Account\BuyAccountRequest;
use App\Http\Requests\DomainRequest;
use App\Http\Resources\Service\ServiceAccountListResource;
use App\Models\AccountList;
use App\Repository\Account\AccountInterface;
use App\Repository\History\PurchaseHistory\PurchaseHistoryInterface;
use App\Repository\Service\ServiceDetail\ServiceDetailInterface;
use App\Repository\Transaction\TransactionInterface;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{
    public function __construct(
        private ServiceDetailInterface $serviceDetailRepository,
        private AccountInterface $accountRepository,
        private TransactionInterface $transactionRepository,
        private PurchaseHistoryInterface $purchaseRepository
    ) {
    }

    public function accountDetail($id, DomainRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        # Check service exists at domain
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        $accountDetail = $this->accountRepository->accountDetail($id, $idListAllow);
        if (!$accountDetail) {
            return BaseResponse::msg("Không tồn tại tài khoản", 404);
        }

        return new ServiceAccountListResource($accountDetail);
    }

    public function recommends(DomainRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        # Check service exists at domain
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        $accountDetail = $this->accountRepository->recommend($idListAllow);

        return ServiceAccountListResource::collection($accountDetail);
    }

    public function buyAccount(BuyAccountRequest $request)
    {
        $validated = $request->validated();
        $domain = $validated['domain'];
        $id = $validated['id'];

        # Check service exists at domain
        $idListAllow = $this->serviceDetailRepository->idServiceDetailList($domain);
        $accountDetailPublic = $this->accountRepository->accountDetail($id, $idListAllow);
        if (!$accountDetailPublic) {
            return BaseResponse::msg("Không tồn tại tài khoản", 404);
        }

        if ($this->transactionRepository->getPrice(Auth::user()) <= 0) {
            return BaseResponse::msg("Tài khoản của bạn không đủ tiền!", 403);
        }

        if ($this->transactionRepository->getPrice(Auth::user()) < $accountDetailPublic->price) {
            return BaseResponse::msg("Bạn không đủ tiền mua tài khoản này! Vui lòng nạp thêm", 403);
        }

        DB::beginTransaction();

        /**
         * @var \App\Models\AccountList
         */
        $accountDetailPrivate = $this->accountRepository->accountDetailGame($id);
        $detailPrivates = json_decode($accountDetailPrivate->detail_private, true);

        # CHECK KEY SERVICE ACCOUNT 
        if ($accountDetailPrivate->service->game_list->game_key === "BOX") {
            try {
                $note = "Mua Box, Sử dụng: {$accountDetailPrivate->service->note}, #ACCOUNT: {$accountDetailPrivate->id}";
                $this->handleBuyBox($accountDetailPrivate, $detailPrivates, $note);
                DB::commit();
                return BaseResponse::msg("Mua thành công! Phần thưởng đã được thêm vào tài khoản của bạn!", 200);
            } catch (\Exception $e) {
                DB::rollBack();
                return BaseResponse::msg($e->getMessage(), 403);
            }
        }
        try {
            $note = "Mua Tài khoản, Sử dụng: {$accountDetailPrivate->service->note}, #ACCOUNT: {$accountDetailPrivate->id}";
            $this->handleBuyAccount($accountDetailPrivate, $note);
            DB::commit();
            return BaseResponse::msg("Mua thành công! Kiểm tra trong lịch sử!", 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 403);
        }
    }

    private function handleBuyAccount(AccountList $accountDetailPrivate, string $note)
    {
        try {
            /************
             * DEFAULT ACTION *
             ************/
            # change status notsell -> sold
            $this->accountRepository->soldAccount($accountDetailPrivate);
            # Save transaction
            $decrementTurn = $this->transactionRepository->createPrice(
                -$accountDetailPrivate->price,
                $note
            );
            if (!$decrementTurn) {
                # REPORT
                throw new Exception("Không thể trừ tiền! Liên hệ admin nếu còn lặp lại!");
            }
            # Save to history purchase
            $this->purchaseRepository->create(
                Auth::user(),
                $accountDetailPrivate->admin,
                $accountDetailPrivate
            );
            /************
             * END-DEFAULT ACTION *
             ************/
            return $decrementTurn;
        } catch (\Exception $e) {
            # REPORT
            throw new Exception($e);
        }
    }

    /**
     * buyBox
     *
     * @param  mixed $accountDetailPrivate
     * @param  mixed $detailPrivates
     * @return true|Exception
     */
    private function handleBuyBox(AccountList $accountDetailPrivate, array $detailPrivates, string $note)
    {
        # if BOX then required currency
        if (!$accountDetailPrivate->service->currency) {
            # REPORT
            throw new Exception("Box này đang bị lỗi! Code: x01");
        }
        # check in detail private key same current key
        foreach ($detailPrivates as $private) {
            # DIAMOND, ROBUX,...
            $currencyKey = $accountDetailPrivate->service->currency->currency_key;
            if ($private['key'] === $currencyKey) {
                $value = ServiceHandle::handleValueGift($currencyKey, $private['value']);
                if (!$value) {
                    # REPORT
                    throw new Exception("Box này đang bị lỗi phần thưởng! Code: x02");
                }
                try {
                    /************
                     * DEFAULT ACTION *
                     ************/
                    $decrementTurn = $this->handleBuyAccount($accountDetailPrivate, $note);
                    /************
                     * END-DEFAULT ACTION *
                     ************/
                    # Give reward
                    ServiceHandle::handleGiveGiftByService(
                        transactionRepository: $this->transactionRepository,
                        currency: $currencyKey,
                        value: $value,
                        note: "Mở Box, 
                        Sử dụng: {$accountDetailPrivate->service->note}, 
                        #ACCOUNT: {$accountDetailPrivate->id}, 
                        #Transaction: {$decrementTurn->id}"
                    );
                    return true;
                } catch (\Exception $e) {
                    # REPORT
                    throw new Exception("Lỗi xảy ra khi thực hiện quá trình!");
                }
            }
        }
        throw new Exception("Box khoản này đang bị lỗi! Code: x03");
    }
}
