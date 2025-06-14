<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\AccountCreateRequest;
use App\Http\Requests\Account\RandomCreateRequest;
use App\Http\Requests\Service\ServiceBoxCreateRequest;
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
    ) {}

    public function list(Request $request)
    {
        $gameKey = $request->input('game_key');
        $sortPrice = $request->input('sortPrice');
        $status = $request->input('status');
        $id = $request->input('id');
        $serviceNote = $request->input('service_note');
        $adminName = $request->input('admin_name');
        $privateInfo = $request->input('private_info');

        $filter = [];

        if ($gameKey) {
            $filter['gameListByService_fillter'] = $gameKey;
        }
        if ($serviceNote) {
            $filter['service_filter'] = $serviceNote;
        }
        if ($adminName) {
            $filter['admin_filter'] = $adminName;
        }
        if ($id) {
            $filter['query'][] = ['id', $id];
        }
        if ($status) {
            $filter['query'][] = ['status', $status == 1 ? "SOLD" : "NOTSELL"];
        }
        if ($privateInfo) {
            $filter['query'][] = ['detail_private', 'like', "%$privateInfo%"];
        }
        if ($sortPrice) {
            $filter['sort'][] = ['price', $sortPrice == 1 ? 'asc' : 'desc'];
        }
        return AccountListResource::collection($this->accountRepository->list(15, $filter));
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

    public function upsertBox(ServiceBoxCreateRequest $request)
    {
        $validated = $request->validated();
        $chests = $validated['chests'];
        $service = $this->serviceRepository->get($validated['service_id']);

        $dataChests = [];

        foreach ($chests as $chest) {
            for ($i = 0; $i < $chest['countChest']; $i++) {
                $dataChests[] = [
                    "text" => "Nhận được {$service->currency->currency_name}, Số lượng",
                    "value" => $chest['value']
                ];
            }
        }
        shuffle($dataChests);
        DB::beginTransaction();
        try {
            foreach ($dataChests as $accountItem) {
                $this->accountRepository->updateOrInsert(null, [
                    "prioritize" => 1,
                    "detail_public" => json_encode([]),
                    "detail_private" => json_encode([
                        [
                            "key" => $service->currency->currency_key,
                            "name" => $accountItem['text'],
                            "value" => $accountItem['value']
                        ]
                    ]),
                    "price" => $service->price,
                    "active" => "YES",
                    "status" => "NOTSELL",
                    "note" => "",
                    "thumb" => null,
                    "images" => null,
                ], admin: Auth::user(), service: $service);
            }
            DB::commit();
            return BaseResponse::msg("Đã thêm mới thành công, SL:" . count($dataChests));
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi đã xảy ra vui lòng kiểm tra lại! Không lưu bất kì tài khoản nào", 500);
        }

        return  $dataChests;
    }

    public function upsertRandom(RandomCreateRequest $request)
    {
        $validated = $request->validated();
        $service = $this->serviceRepository->get($validated['idServiceGame']);
        $listAccount = explode("\n", $validated['list_account']);

        DB::beginTransaction();
        try {
            $privateForm = json_decode($service->private_form, true);
            foreach ($listAccount as $accountItem) {
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
            DB::commit();
            return BaseResponse::msg("Đã thêm mới thành công, SL:" . count($listAccount));
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi đã xảy ra vui lòng kiểm tra lại! Không lưu bất kì tài khoản nào", 500);
        }
    }

    public function upsertAccount(AccountCreateRequest $request)
    {
        $validated = $request->validated();
        $service = $this->serviceRepository->get($validated['idServiceGame']);

        $privateForm = $this->getDataForm(json_decode($service->private_form, true), $validated['data']);
        $publicForm = $this->getDataForm(json_decode($service->public_form, true), $validated['data']);

        # UPLOAD IMAGE THUMB
        $thumb = $validated['data']['thumb'][0];
        $imageThumb = (is_string($thumb) || $thumb == null) ?
            $thumb :
            uploadImageQueue($thumb);
        # UPLOAD IMAGES DETAIL
        $imagesDetail = [];
        foreach ($validated['data']['images'] as $image) {
            $imagesDetail[] = (is_string($image) || $image == null) ? $image : uploadImageQueue($image);
        }

        DB::beginTransaction();

        try {
            $this->accountRepository->updateOrInsert($validated['id'] ?? null, [
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

            DB::commit();
            return BaseResponse::msg($validated['id'] ? "Sửa tài khoản thành công!" : "Đã thêm tài khoản mới thành công");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg($e->getMessage(), 500);
        }
    }

    private function convertDataRandom(array $privateForm, string $accountItem)
    {
        $result = [];
        $explodeAccount = explode("|", $accountItem);
        foreach ($privateForm as $key => $value) {
            if (!isset($explodeAccount[$key])) {
                continue;
            }
            $result[$value['name']] = $explodeAccount[$key];
        }
        return $result;
    }

    private function getDataForm(array $array, array $values)
    {
        $result = [];
        foreach ($array as $item) {
            // Skip info not required
            if ((!isset($item['isRequired']) || $item['isRequired'] === false) && empty($values[$item['name']])) {
                continue;
            }

            $result[] = [
                "key" => $item['name'],
                "name" => $item['label'],
                "value" => $values[$item['name']]
            ];
        }
        return $result;
    }
}
