<?php

namespace App\Http\Controllers\Webhook;

use App\Http\Controllers\Controller;
use App\Repository\Histories\WithdrawHistory\WithdrawHistoryInterface;
use App\Repository\Transaction\TransactionInterface;
use Illuminate\Http\Request;

class PushDiamondController extends Controller
{

    public function __construct(
        private WithdrawHistoryInterface $withdrawHistoryRepository,
        private TransactionInterface $transactionRepository,
    ) {
    }

    public function postdau_v3()
    {

        // return response()->json("bao tri", 200);

        # GET ALL WITHDRAW DIAMOND WITH STATUS = "PENDING" AND GET FIST ROW
        $withdraw = $this->withdrawHistoryRepository->getByConditions([
            ["status", "PENDING"],
            ["withdraw_type", "DIAMOND"],
        ]);

        // dd();
        // if ($getdata == null) return response()->json("Hết đơn", 200);

        // // chuyển ssang status là 5 để tránh trường hợp nạp cùng hàng
        // $getdata->status = 5;
        // $getdata->save();

        // $getitem = '';
        // switch ($getdata->diamond) {
        //     case 88:
        //         $getitem = 20000;
        //         break;
        //     case 220:
        //         $getitem = 50000;
        //         break;
        //     case 440:
        //         $getitem = 100000;
        //         break;
        //     case 880:
        //         $getitem = 200000;
        //         break;
        //     case 2200:
        //         $getitem = 500000;
        //         break;
        //     default:
        //         return response()->json(["msg" => "Số kim cương rút không đúng định dạng"], 200);
        //         break;
        // }


        // $id = json_decode($getdata->uid_diamond, true)['idgame'];

        // $chinh = PR::where('user_id', $getdata->user_id)->first();

        // $typeWithDraw = 'USER';

        // // 001: UID không bị chặn
        // // 003: tìm thấy - Tới giới hạn
        // // 005: tìm thấy - Chưa tới giới hạn
        // // 007: chặn

        // # kiểm tra liệu dc rút hay không
        // $withDrawCode = $this->CheckLimitWithdraw($getdata->id, $getdata->user_id, $getdata->diamond);

        // if ($withDrawCode == 007 || $withDrawCode == 003) {

        //     # chuyển rút qua tài khoản riêng
        //     $typeWithDraw = 'PR';
        //     # cập nhật trạng thái đã hủy
        //     $getdata->status = 1;
        //     $getdata->save();

        //     # cộng lại tiền
        //     $diamond1 = ModelUser::where('provider_id', $getdata->user_id)->first();
        //     $diamond1->diamond += $getdata->diamond;
        //     $diamond1->save();

        //     return response()->json(["code" => $withDrawCode, "msg" => "Chặn rút kim cương (007 - 003) "], 200);
        // } elseif ($withDrawCode == 005) {
        //     # chuyển rút qua tài khoản riêng
        //     $typeWithDraw = 'PR';
        // }


        // # API key
        // $dataaa_tst = [
        //     "shoptiennghi.com" => "C9EC9856FA7A67154FDF42ED67F1AD0D",
        // ];



        // if (isset($dataaa_tst[$getdata->shop])) {
        //     // lấy key ra để làm code
        //     if ($typeWithDraw == 'USER') {
        //         $code = $dataaa_tst[$getdata->shop];
        //         $ghichu = '';
        //     } else {
        //         $code = '5f5e08ca80643db5685a65c7f0e44aef'; // thay api khi rút từ pr qua tài khoản khác tại đây
        //         $ghichu = $getdata->shop;
        //     }
        // } else {
        //     Log::channel('test')->info("HUY404: Shop nay khong tim thay apikey");
        //     return response()->json('Shop nay khong tim thay apikey', 404);
        //     $code = '';
        // }


        // Log::channel('test')->info("ID:" . $getdata->id . " |ID Game: " . $id . " |SL " . $getdata->diamond);

        // $request_id = rand(100000000, 999999999);  /// Cái này có thể mà mã order của bạn, nếu không có thì để nguyên ko cần động vào.   

        // $url = "https://rutkimcuong.club/chargingws/v2?APIkey=" . $code . "&playerid=" . $id . "&menhgia=" . $getitem . "&content=" . $request_id . "&ghichu=" . $ghichu;
        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_URL, $url);
        // curl_setopt($ch, CURLOPT_POST, 1);
        // $actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        // curl_setopt($ch, CURLOPT_REFERER, $actual_link);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // $result = curl_exec($ch);

        // $obj = json_decode($result, true);

        // var_dump($obj);

        // Log::channel('test')->info(json_encode($result) . " X ID:" . $getdata->id . " |ID Game: " . $id . " |SL " . $getdata->diamond);

        // if (isset($obj['status'])) {


        //     if ($obj['status'] == "00") {

        //         # Xác minh giao dịch ok
        //         $getdata->status = 10;
        //         $getdata->taskid = $request_id;
        //         $getdata->save();

        //         return response()->json($obj['msg'], 200);
        //     } else {

        //         # Giao dịch thất bại
        //         $getdata->status = 1;
        //         $getdata->save();

        //         $diamond1 = ModelUser::where('provider_id', $getdata->user_id)->first();
        //         $diamond1->diamond += $getdata->diamond;
        //         $diamond1->save();

        //         return response()->json($obj['msg'] . " Huy", 200);

        //         Log::channel('test')->info($obj['msg'] . " X ID:" . $getdata->id . " |ID Game: " . $id . " |SL " . $getdata->diamond);
        //     }
        // } else {

        //     Log::channel('test')->info(" Khong thay status X ID:" . $getdata->id . " |ID Game: " . $id . " |SL " . $getdata->diamond);
        //     # chuyển về chờ duyệt
        //     $getdata->status = 0;
        //     $getdata->save();
        //     return response()->json("Không thấy status", 200);
        // }
    }
}
