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
            "detail" => json_encode($this->gifts($quantity))
        ];
    }

    public function gifts(float $number = 1)
    {
        $allGifts = [
            "default" => $this->allGifts($number, $this->faker->numberBetween(50, 100)),
            "details" => []
        ];

        for ($i = 0; $i < $number; $i++) {
            $allGifts['details'][] = [
                "name" => $this->gift($this->faker->numberBetween(5, 10)),
                "service_gift_id" => 1
            ];
        }

        return $allGifts;
    }

    public function gift(float $value)
    {
        return "Chúc mừng bạn đã trúng: $value";
    }
    public function allGifts(float $quantity, float $value)
    {
        return "Tổng lượt quay: x$quantity | Tổng phần thưởng nhận được: $value";
    }
}
