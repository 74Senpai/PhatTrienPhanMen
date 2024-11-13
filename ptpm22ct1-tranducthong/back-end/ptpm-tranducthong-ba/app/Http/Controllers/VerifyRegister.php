<?php
namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserResource;

class VerifyRegister extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'      => 'required|string|max:255',
            'email'     => 'required|string|email|max:255|unique:users',
            'password'  => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $user = User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => Hash::make($request->password),
            ]);

            $token = $user->createToken($request->name);

        
            return response()->json([
                'data'          => new UserResource($user),
                'token'         => $token->plainTextToken,
                'token_type'    => 'Bearer',
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'User registration failed'], 500);
        }
    }

    public function login(Request $request)
    {   
        $credentials = $request->only('email', 'password');

        // Tìm người dùng theo email
        $user = User::where('email', $credentials['email'])->first();

        if(!$user){
            return response()->json(['message' => 'Email không tồn tại'], 401);
        }
        // Kiểm tra xem người dùng có tồn tại và mật khẩu có khớp không
        if (Hash::check($credentials['password'], $user->password)) {
            // Tạo token cho người dùng
            $token = $user->createToken($user->name)->plainTextToken;

            return response()->json([
                'token'         => $token,
                'token_type'    => 'Bearer',
                'data'          => $user,
            ]);
        }else{
            return response()->json(['message' => 'Sai mật khẩu'], 401);
        }
        
    }

    public function logout(Request $request)
    {
        \Log::info('Logout request received'); // Thêm dòng này
        $user = $request->user();
        if ($user) {
            // Xóa tất cả token của user hiện tại
            $user->tokens()->delete();
            return response()->json(['message' => 'Logout success!'], 201);
        } else {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
    }

}
