<?php

namespace App\Http\Controllers;

use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::get('all-user', [UserController::class, 'getUsers'])->middleware('auth:sanctum');

// Route::get('all-author', [UserController::class, 'getAuthors']);

// Route::get('author/id={id}', [UserController::class, 'getAuthorByID']);

Route::controller(UserController::class)->group(function(){
    Route::middleware(['auth:sanctum'])->group( function(){
        Route::post('delete/account', 'DeleteUser');
        Route::post('update/account', 'UpdateUser');
        Route::post('author/register', 'AuthorRegister');
    }); 
});

Route::controller(VerifyRegister::class)->group(function () {
    Route::post('sign-up','register');
    Route::post('login',  'login');
    Route::post('logout', 'logout')->middleware('auth:sanctum');
});

Route::middleware(['auth:sanctum'])
    ->prefix(config('admin.prefix'))
    ->group(function(){
            Route::post('blog-type/create', [BlogTypeController::class, 'createNewBlogType']);
            Route::get('comment/all', [CommentsController::class, 'getAllComments']);
            Route::get('comment/user/id={id}', [CommentsController::class, 'getUserAllComments']);
});

Route::prefix('public')->group(function(){
    Route::get('blog-type/show/all', [BlogTypeController::class, 'readAllBlogType']);
    Route::get('blog-type/show/id={id}', [BlogTypeController::class, 'readBlogTypeById']);
    Route::get('blog/all', [BlogController::class, 'showAllBlogs']);
    Route::get('blog/id={id}', [BlogController::class, 'showBlogById']);
    Route::get('comment/blog/id={id}', [CommentsController::class, 'getBlogAllComments']);
    Route::get('find/user/id={id}', [UserController::class, 'findUserById']);
    Route::get('blog/show/type={type}', [BlogController::class, 'getBlogByType']);
    Route::get('blog/show/orderby/view', [BlogController::class, 'getBlogByViews']);
    Route::get('blog/name={name_blog}', [BlogController::class, 'findByName']);
});

Route::prefix('author')
    ->middleware(['auth:sanctum'])
    ->group(function(){
        Route::post('blog/create-new', [BlogController::class, 'createBlog']);
        Route::delete('blog/delete/id={id}', [BlogController::class, 'destroyBlog']);
        Route::put('blog/update', [BlogController::class, 'updateBlog']);
        Route::get('blog/all', [AuthorController::class, 'getAllBlogInformation']);
});
    
Route::prefix('user')
    ->middleware(['auth:sanctum'])
    ->group(function(){
        Route::get('information', [UserController::class, 'getUserInfor']);
        Route::post('comment/create-new', [CommentsController::class, 'createNewComment']);
        Route::get('comment/user/id={id}', [CommentsController::class, 'getUserAllComments']);
        Route::get('role', [UserController::class, 'getRole']);
});