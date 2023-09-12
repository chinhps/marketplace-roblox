<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\User\UserResource;
use App\Repository\User\UserInterface;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct(
        private UserInterface $userRepository
    ) {
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
}
