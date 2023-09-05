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

    public function list()
    {
        return UserResource::collection($this->userRepository->list(15));
    }

    public function getId($id)
    {
        return new UserResource($this->userRepository->get($id));
    }
}
