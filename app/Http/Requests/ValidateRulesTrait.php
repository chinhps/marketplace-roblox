<?php

namespace App\Http\Requests;

use App\Rules\Domain;

trait ValidateRulesTrait
{
    public function domainRules(): array
    {
        return [
            "rules" => [
                "domain" => ["bail", "required", "string", "exists:shop_list,domain", new Domain]
            ],
            "messages" => [
                'domain.*' => 'Dữ liệu gửi lên đang gặp vấn đề! Liên hệ admin'
            ]
        ];
    }
}
