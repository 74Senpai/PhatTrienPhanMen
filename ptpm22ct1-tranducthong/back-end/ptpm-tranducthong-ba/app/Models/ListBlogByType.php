<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListBlogByType extends Model
{
    use HasFactory;

    protected $table = 'list_blog_by_type';
    protected $fillable = [
        'id_type', 'id_blog'
    ];

    public $timestamps = false;

}
