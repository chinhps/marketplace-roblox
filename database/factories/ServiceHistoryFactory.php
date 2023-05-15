<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceHistory>
 */
class ServiceHistoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity = $this->faker->randomElement([1, 3, 5, 7, 10]);
        return [
            "quantity" => $quantity,
            "detail" => match ($quantity) {
            }
        ];
    }

    public function gifts(float $number = 1)
    {
        function gift(float $value)
        {
            return "Chúc mừng bạn đã trúng: $value";
        }
        function allGifts(float $quantity, float $value)
        {
            return "Tổng lượt quay: x$quantity | Tổng phần thưởng nhận được: $value";
        }

        $allGifts = [
            "default" => allGifts($number, 100),
            "details" => []
        ];

        for ($i = 0; $i < $number; $i++) {
            $allGifts['details'][] = [
                "name" => gift(10),
                "service_gift_id" => 1
            ];
        }
    }
}
