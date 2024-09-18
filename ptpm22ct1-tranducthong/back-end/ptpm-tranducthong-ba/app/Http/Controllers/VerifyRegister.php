<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class VerifyRegister extends Controller
{
    public function register(Request $request)
    {
        // Validate dữ liệu nhập từ request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        // Tạo user mới
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Tạo token cho user vừa đăng ký
        $token = $user->createToken('authToken')->plainTextToken;

        // Trả về token và thông tin user
        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
    }
}