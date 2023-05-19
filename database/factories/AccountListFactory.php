<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AccountList>
 */
class AccountListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "prioritize" => 1,
            "detail_public" => json_encode([
                [
                    "key" => "CHAMPS",
                    "name" => "Tướng",
                    "value" => $this->faker->numberBetween(20, 100)
                ],
                [
                    "key" => "SKINS",
                    "name" => "Trang phục",
                    "value" => $this->faker->numberBetween(300, 600)
                ]
            ]),
            "detail_private" => json_encode([
                [
                    "key" => "USERNAME",
                    "name" => "Tài khoản",
                    "value" => $this->faker->userName()
                ],
                [
                    "key" => "PASSWORD",
                    "name" => "Mật khẩu",
                    "value" => $this->faker->password()
                ],
                [
                    "key" => "FA2",
                    "name" => "Mã 2FA",
                    "value" => $this->faker->text(15)
                ]
            ]),
            "price" => $this->faker->numberBetween(10, 50) * 10000,
            "thumb" => $this->faker->imageUrl(640, 480, null, true, "Thumb account"),
            "images" => function () {
                $images = [];
                for ($i = 0; $i < rand(3, 10); $i++) {
                    $images[] = $this->faker->imageUrl(640, 480, null, true, "Image detail $i");
                }
                return json_encode($images);
            },
            "active" => $this->faker->randomElement(['YES', 'NO']),
            "status" => $this->faker->randomElement(['SOLD', 'NOTSELL']),
        ];
    }
}
