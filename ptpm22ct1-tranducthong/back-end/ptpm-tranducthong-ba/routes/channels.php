<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('comments-channel.blog.{id_blog}', function($id_blog){
    $blog = \App\Models\Blog::where('id_blog', $id_blog)->first();
    return $blog->id_blog == $id_blog;
});

Broadcast::channel('author-notification.user.{user_id}', function($user_id){
    $author = \App\Models\Author::where('user_id', $user_id)->first();
    return $author->user_id === $user_id;
});