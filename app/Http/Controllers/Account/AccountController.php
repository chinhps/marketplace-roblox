<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\AccountCreateRequest;
use App\Http\Resources\Account\AccountListResource;
use App\Repository\Account\AccountInterface;
use App\Repository\Service\ServiceInterface;
use Illuminate\Http\Request;

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
        return new AccountListResource($this->accountRepository->get($id));
    }

    public function delete($id)
    {
        try {
            $this->accountRepository->delete($id);
            return BaseResponse::msg("Xóa thành công", 200);
        } catch (\Exception $e) {
            return BaseResponse::msg("Xóa thất bại", 500);
        }
    }

    public function upsert(AccountCreateRequest $request)
    {
        $validated = $request->validated();
        $service = $this->serviceRepository->get($validated['idServiceGame']);

        $privateForm = $this->getDataForm(json_decode($service->private_form, true), $validated);
        $publicForm = $this->getDataForm(json_decode($service->public_form, true), $validated);

        return $publicForm;
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
