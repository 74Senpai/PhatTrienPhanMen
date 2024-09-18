<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class dataPostStore extends Controller
{
    public function dataByPOST (Request $request){
        $userName = $request->input('userName');
        $email = $request->input('email');
        $password = $request->input('password');

        $data = $request->all();

        return response()->json([
            'message' => 'Dữ liệu đã được xử lý',
            'data' => $data
        ]);
    }

}
