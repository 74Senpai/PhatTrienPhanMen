<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_blog';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'id_blog','name_blog', 
        'id_author', 'content_blog', 
        'view', 'show_type', 
        'updated_at', 'created_at',
        'blog_describe', 'thumbnail'
    ];

    public $timestamps = true;

}
