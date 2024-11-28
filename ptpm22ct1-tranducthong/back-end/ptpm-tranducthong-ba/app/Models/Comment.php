<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    //	id_comment	user_id	id_blog	content_comment	day_comment	id_parent_comment
    protected $primaryKey = 'id_comment';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'id_blog','user_id', 
        'content_comment', 
        'day_comment', 'id_parent_comment'
    ];

    public $timestamps = false;

}
