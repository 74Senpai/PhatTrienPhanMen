<?php

namespace App\Http\Controllers;

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
    
}
