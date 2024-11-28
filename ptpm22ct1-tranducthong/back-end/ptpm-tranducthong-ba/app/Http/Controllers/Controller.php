<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

abstract class Controller
{
    protected function validateAdminRole( Request $request ){
        $user = $request->user();
        if($user->id_role == config('roles.admin')){
            return true;
        }
        return false;
    }

    protected function validateAuthorRole( Request $request ){
        $user = $request->user();
        $author = Author::where('user_id', $user->user_id)->first();
        if($author != null && ($author->id_role == config('roles.author') || $author->id_role == config('roles.admin')))
        {
            return true;
        }
        return false;
    }
    
}
