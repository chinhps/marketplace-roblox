<?php

namespace App\Http\Controllers\Plugin;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Repository\Plugin\PluginInterface;
use Illuminate\Http\Request;

class PluginController extends Controller
{
    public function __construct(
        private PluginInterface $pluginRepository
    ) {
    }

    public function all()
    {
        $cost = $this->pluginRepository->getByKey("cost_robux")['cost_robux'] ?? 0;
        $linkPage = $this->pluginRepository->getByKey("fanpage")['link_page'] ?? "";
        $message = $this->pluginRepository->getByKey("message_top_recharge")['message'] ?? "";
        $prioritizeRecharge = $this->pluginRepository->getByKey("prioritize_recharge")["prioritize_recharge"] ?? "";

        $response = [
            "cost_robux" => $cost,
            "link_fanpage" => $linkPage,
            "message_top_recharge" => $message,
            "prioritize_recharge" => $prioritizeRecharge
        ];
        return BaseResponse::data($response);
    }
}
