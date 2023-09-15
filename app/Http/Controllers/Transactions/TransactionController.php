<?php

namespace App\Http\Controllers\Transactions;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Transaction\TransactionCreateRequest;
use App\Http\Resources\Transaction\TransactionResource;
use App\Models\User;
use App\Repository\Transaction\TransactionInterface;
use App\Repository\User\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function __construct(
        private TransactionInterface $transactionRepository,
        private UserInterface $userRepository
    ) {
    }

    public function priceList()
    {
        return TransactionResource::collection($this->transactionRepository->listPrice(15));
    }

    public function robuxList()
    {
        return TransactionResource::collection($this->transactionRepository->listRobux(15));
    }

    public function diamondList()
    {
        return TransactionResource::collection($this->transactionRepository->listDiamond(15));
    }

    public function createTransaction(TransactionCreateRequest $request)
    {
        $validated = $request->validated();
        $user = $this->userRepository->get($validated['user_id']);

        $multiply = -1;
        # minus or plus
        if ($validated['transaction_type'] === "increase") {
            $multiply = 1;
        }

        DB::beginTransaction();
        try {
            switch ($validated['currency']) {
                case "PRICE":
                    $this->priceTransaction($user, $validated, $multiply);
                    break;
                case "ROBUX":
                    $this->robuxTransaction($user, $validated, $multiply);
                    break;
                case "DIAMOND":
                    $this->diamondTransaction($user, $validated, $multiply);
                    break;
            }
            DB::commit();
            return BaseResponse::msg("Tạo transaction cho {$validated['currency']} thành công! Double Click vào để kiểm tra!");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Gặp lỗi trong quá trình tạo transaction", 500);
        }
    }

    private function priceTransaction(User $user, $validated, float $multiply)
    {
        return $this->transactionRepository->createPrice(
            $user,
            $validated['value'] * $multiply,
            $validated['note'] . " update by #ADMIN ID: " . Auth::id()
        );
    }

    private function robuxTransaction(User $user, $validated, float $multiply)
    {
        return $this->transactionRepository->creaeteRobux(
            $user,
            $validated['value'] * $multiply,
            $validated['note'] . " update by #ADMIN ID: " . Auth::id()
        );
    }

    private function diamondTransaction(User $user, $validated, float $multiply)
    {
        return $this->transactionRepository->createDiamond(
            $user,
            $validated['value'] * $multiply,
            $validated['note'] . " update by #ADMIN ID: " . Auth::id()
        );
    }
}
