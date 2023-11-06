<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserUpdateRequest;
use App\Http\Resources\User\UserResource;
use App\Repository\User\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{

    public function __construct(
        private UserInterface $userRepository
    ) {
    }

    public function navbar()
    {

        if (Gate::allows('ctv', Auth::user())) {
            return BaseResponse::data([
                [
                    'name' => 'Trang chủ',
                    'children' => [
                        [
                            'name' => 'Trang chủ',
                            'link' => '/',
                        ]
                    ],
                ],
                [
                    'name' => 'Dịch vụ',
                    'children' => [
                        [
                            'name' => 'Quản lý tài khoản',
                            'link' => '/services/accounts',
                        ],
                        [
                            'name' => 'Quản lý Random',
                            'link' => '/services/account-random',
                        ],
                    ],
                ],
                [
                    'name' => 'Lịch sử dịch vụ',
                    'children' => [
                        [
                            'name' => 'Mua tài khoản',
                            'link' => '/history/purchases',
                        ],
                    ],
                ],
                [
                    'name' => 'Trợ giúp',
                    'link' => '/abc',
                ],
            ]);
        }

        if (Gate::allows('koc', Auth::user())) {
            return BaseResponse::data([
                [
                    'name' => 'Trang chủ',
                    'children' => [
                        [
                            'name' => 'Trang chủ',
                            'link' => '/',
                        ]
                    ],
                ],
                [
                    'name' => 'Plugins',
                    'children' => [
                        [
                            'name' => 'Thống kê tháng',
                            'link' => '/statisticals',
                        ],
                    ],
                ],
                [
                    'name' => 'Lịch sử dịch vụ',
                    'children' => [
                        [
                            'name' => 'Trò chơi',
                            'link' => '/history/services',
                        ],
                        [
                            'name' => 'Mua tài khoản',
                            'link' => '/history/purchases',
                        ],
                        [
                            'name' => 'Nạp thẻ',
                            'link' => '/history/recharges',
                        ]
                    ],
                ],
                [
                    'name' => 'Trợ giúp',
                    'link' => '/abc',
                ],
            ]);
        }

        $data = [
            [
                'name' => 'Trang chủ',
                'children' => [
                    [
                        'name' => 'Trang chủ',
                        'link' => '/',
                    ],
                    [
                        'name' => 'Quản lý shop',
                        'link' => '/shop-list',
                    ],
                ],
            ],
            [
                'name' => 'Plugins',
                'children' => [
                    [
                        'name' => 'Quản lý Plugins',
                        'link' => '/plugins',
                    ],
                    [
                        'name' => 'Quản lý Event',
                        'link' => '/events',
                    ],
                    [
                        'name' => 'Quản lý rút',
                        'link' => '/withdrawal-limits',
                    ],
                    [
                        'name' => 'Thống kê tháng',
                        'link' => '/statisticals',
                    ],
                ],
            ],
            [
                'name' => 'Lịch sử dịch vụ',
                'children' => [
                    [
                        'name' => 'Trò chơi',
                        'link' => '/history/services',
                    ],
                    [
                        'name' => 'Mua tài khoản',
                        'link' => '/history/purchases',
                    ],
                    [
                        'name' => 'Nạp thẻ',
                        'link' => '/history/recharges',
                    ],
                    [
                        'name' => 'Rút / Thuê / ...',
                        'link' => '/history/withdraw',
                    ],
                ],
            ],
            [
                'name' => 'Dịch vụ',
                'children' => [
                    [
                        'name' => 'Quản lý dịch vụ',
                        'link' => '/services',
                    ],
                    [
                        'name' => 'Quản lý tài khoản',
                        'link' => '/services/accounts',
                    ],
                    [
                        'name' => 'Quản lý Random',
                        'link' => '/services/account-random',
                    ],
                ],
            ],
            [
                'name' => 'Người dùng',
                'children' => [
                    [
                        'name' => 'Quản lý khách',
                        'link' => '/users/user',
                    ],
                    [
                        'name' => 'Quản lý admins',
                        'link' => '/users/admin',
                    ],
                ],
            ],
            [
                'name' => 'Top nạp thẻ',
                'children' => [
                    [
                        'name' => 'Quản lý',
                        'link' => '/top-recharge',
                    ],
                ],
            ],
            [
                'name' => 'Trợ giúp',
                'link' => '/abc',
            ],
        ];

        return BaseResponse::data($data);
    }

    public function list(Request $request)
    {
        $name = $request->input('name');
        $id = $request->input('id');
        $provider_id = $request->input('provider_id');
        $sortPrice = $request->input('sortPrice');

        $filter = [];

        if ($name) {
            $filter['query'][] = ['name', 'like', "%$name%"];
        }
        if ($id) {
            $filter['query'][] = ['id', $id];
        }
        if ($provider_id) {
            $filter['query'][] = ['provider_id', 'like', "%$provider_id%"];
        }
        if ($sortPrice) {
            $filter['sort'][] = ['price_temporary', $sortPrice == 1 ? 'asc' : 'desc'];
        }
        return UserResource::collection($this->userRepository->list(15, $filter));
    }

    public function getId($id)
    {
        return new UserResource($this->userRepository->get($id));
    }

    public function blockUser($id, UserUpdateRequest $request)
    {
        $validated = $request->validated();

        DB::beginTransaction();
        try {
            $this->userRepository->update($id, [
                'block' => $validated['block'] ? "on" : "off"
            ]);
            DB::commit();
            return BaseResponse::msg("Cập nhật thành công");
        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::msg("Có lỗi khi cập nhật user!", 500);
        }
    }
}
