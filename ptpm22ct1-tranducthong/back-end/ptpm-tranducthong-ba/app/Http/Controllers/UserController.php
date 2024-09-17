<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Author;

class UserController extends Controller
{
    public function getUsers()
    {
        $users = User::all(); // Lấy tất cả người dùng từ cơ sở dữ liệu
        
        return response()->json([
            'status' => 'success',
            'data' => $users
        ], 200); // Trả về JSON với mã trạng thái 200 (OK)
    }

    public function getAuthors()
    {
        $authors = Author::all();
        return response()->json([
            'status' => 'success',
            'data' => $authors
        ], 200);
    }

    public function getAuthorByID($id)
    {
        $author = Author::find($id);
        if($author){
            return response()->json([
                'status' => 'success',
                'data' => $author
            ], 200);
        }else {
            return response()->json([
                'status' => 'error',
                'message' => 'not found'
            ], 404);
        }
    }
}
