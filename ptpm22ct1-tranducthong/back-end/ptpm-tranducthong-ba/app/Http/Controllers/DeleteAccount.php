<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;

class DeleteAccount extends Controller
{
    public function DeleteUser(Request $request){

        $user = $request->user();
        if ($user) {
            try {
                $user->delete(); 
                return response()->json(['success' => 'User deleted successfully']);
            } catch (Exception $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
    }
}
