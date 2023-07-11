<?php

namespace App\Helper;

class RandomPercent
{
    public static function randomItemByPercentage(array $items)
    {
        $ranges = [];
        $totalPercentage = 0;

        foreach ($items as $item) {
            $totalPercentage += $item['percentage'];
        }

        $start = 0;
        foreach ($items as $item) {
            $percentage = $item['percentage'] / $totalPercentage;
            $end = $start + $percentage * 1000000; // Nhân với hằng số lớn (vd: 1000000)
            $ranges[] = [
                'item' => $item,
                'start' => $start,
                'end' => $end,
            ];
            $start = $end;
        }

        $randomNumber = mt_rand(1, 1000000); // Số nguyên random từ 1 đến 1000000

        foreach ($ranges as $range) {
            if ($randomNumber >= $range['start'] && $randomNumber <= $range['end']) {
                return $range['item'];
            }
        }

        return null; // Trả về null nếu không tìm thấy phần tử nào
    }
}
