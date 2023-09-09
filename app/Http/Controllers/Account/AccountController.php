<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\AccountCreateRequest;
use App\Http\Requests\Account\RandomCreateRequest;
use App\Http\Resources\Account\AccountListResource;
use App\Repository\Account\AccountInterface;
use App\Repository\Service\ServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{

    public function __construct(
        private AccountInterface $accountRepository,
        private ServiceInterface $serviceRepository
    ) {
    }

    public function list()
    {
        return AccountListResource::collection($this->accountRepository->list(15));
    }

    public function getId($id)
    {
        try {
            return new AccountListResource($this->accountRepository->get($id));
        } catch (\Exception $e) {
            return BaseResponse::msg($e->getMessage(), 500);
        }
    }

    public function delete($id)
    {
        try {
            $this->accountRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg($e->getMessage(), 500);
        }
    }

    public function upsertRandom(RandomCreateRequest $request)
    {
        $validated = $request->validated();
        $service = $this->serviceRepository->get($validated['idServiceGame']);
        $listAccount = explode("\n", $validated['list_account']);

        DB::beginTransaction();
        try {
            foreach ($listAccount as $accountItem) {
                $privateForm = json_decode($service->private_form, true);
                $this->accountRepository->updateOrInsert(null, [
                    "prioritize" => 1,
                    "detail_public" => json_encode([]),
                    "detail_private" => json_encode($this->getDataForm(
                        $privateForm,
                        $this->convertDataRandom($privateForm, $accountItem)
                    )),
                    "price" => $service->price,
                    "active" => "YES",
                    "status" => "NOTSELL",
                    "note" => "",
                    "thumb" => null,
                    "images" => null,
                ], admin: Auth::user(), service: $service);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi đã xảy ra vui lòng kiểm tra lại! Không lưu bất kì tài khoản nào", 500);
        }

        DB::commit();
        return $listAccount;
    }

    public function upsertAccount(AccountCreateRequest $request)
    {
        $validated = $request->validated();
        $service = $this->serviceRepository->get($validated['idServiceGame']);

        $privateForm = $this->getDataForm(json_decode($service->private_form, true), $validated['data']);
        $publicForm = $this->getDataForm(json_decode($service->public_form, true), $validated['data']);

        # UPLOAD IMAGE THUMB
        $imageThumb = uploadImageQueue($validated['data']['thumb'][0]);
        # UPLOAD IMAGES DETAIL
        $imagesDetail = [];
        foreach ($validated['data']['images'] as $image) {
            $imagesDetail[] = uploadImageQueue($image);
        }

        $account = $this->accountRepository->updateOrInsert($validated['id'] ?? null, [
            "prioritize" => 1,
            "detail_public" => json_encode($publicForm),
            "detail_private" => json_encode($privateForm),
            "price" => $validated['data']['price'],
            "active" => $validated['data']['active'] ? "YES" : "NO",
            "status" => "NOTSELL",
            "note" => $validated['data']['note'],
            "thumb" => $imageThumb,
            "images" => json_encode($imagesDetail)
        ], admin: Auth::user(), service: $service);

        return $account;
    }

    private function convertDataRandom(array $array, string $accountItem)
    {
        $result = [];
        foreach ($array as $key => $value) {
            $explodeAccount = explode("|", $accountItem);
            $result[$value['name']] =  $explodeAccount[$key];
        }
        return $result;
    }

    private function getDataForm(array $array, array $values)
    {
        $result = [];
        foreach ($array as $item) {
            $result[] = [
                "key" => $item['name'],
                "name" => $item['label'],
                "value" => $values[$item['name']]
            ];
        }
        return $result;
    }
}
