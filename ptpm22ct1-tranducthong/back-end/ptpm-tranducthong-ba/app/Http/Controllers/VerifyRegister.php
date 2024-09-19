<?php
namespace App\Http\Controllers;

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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $token = $user->createToken($request->name);

        
            return response()->json([
                'user' => new UserResource($user),
                'token' => $token->plainTextToken
            ], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'User registration failed'], 500);
        }
    }

    public function login(Request $request){
        $request->validate([
            'email' => 'required|string|email|max:255|exists:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::where('email', $request->email)->first();

        if(!$user || !Hash::check($request->password, $user->password) ){
            return response()->json([
                'message' => 'Email or password incorrect!'
            ], 201);
        }

        $token = $user->createToken($user->name);
        return response()->json([
            'message' => 'Login success!',
            'token' => $token->plainTextToken
        ], 201);
    }
}
