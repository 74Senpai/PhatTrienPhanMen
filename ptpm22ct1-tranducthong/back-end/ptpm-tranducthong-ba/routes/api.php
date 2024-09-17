<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/all-user', [UserController::class, 'getUsers']);

Route::get('/all-author', [UserController::class, 'getAuthors']);

Route::get('/author/id={id}', [UserController::class, 'getAuthorByID']);