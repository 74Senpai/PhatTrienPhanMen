<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('user/welcome');
});

Route::get('home', function (){
    return view('user/home');
});


