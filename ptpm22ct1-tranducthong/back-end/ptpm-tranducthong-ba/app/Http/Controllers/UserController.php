<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Author;
use Illuminate\Http\Request;
class UserController extends Controller
{
    public function DeleteUser(Request $request){

        $user = $request->user();
        if ($user) {
            try {
                $user->delete(); 
                return response()->json(['message' => 'User deleted successfully']);
            } catch (Exception $e) {
                return response()->json(['message' => $e->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'User not found'], 404);
        }
    }

    public function UpdateUser(Request $request) {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $userUpdate = User::where('email', $request->email)->first();
        if ($userUpdate && $userUpdate !== $user) {
            return response()->json(['message' => 'Email đã tồn tại'], 409);
        }
    
        $user->email = $request->email ?? $user->email;
        $user->name = $request->userName ?? $user->name;
    
        $user->save();
    
        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user,
        ], 200);
    }

    public function AuthorRegister(Request $request){
        $user = $request->user();
        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }

        $authorByID = Author::where('user_id', $user->user_id)->first();
        if($authorByID) 
            return response()->json(['message' => 'User have a account'], 400);

        $authorByPhone = Author::where('phone_number', $request->phone)->first();
        if($authorByPhone)
            return response()->json(['message' => 'Đã tồn tại'], 400);

        $authorByName = Author::where('name_author', $request->name_author)->first();
        if($authorByName)
           return response()->json(['message' => 'Tên tác giả đã tồn tại'], 400);
        
        try{
            $user->id_role = 3;
            $author = Author::create([
                'name_author' => $request->name_author,
                'phone_number' => $request->phone,
                'id_role' => $user->id_role,
                'user_id' => $user->user_id
            ]);
            
            $user->save();
            return response()->json([
                'message' => 'Register Authors successfully',
                'Author_data' => $author
            ]);
        }catch(Exception $e){
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
