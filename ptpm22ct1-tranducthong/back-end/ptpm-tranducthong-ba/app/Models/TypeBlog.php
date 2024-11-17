<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeBlog extends Model
{
    use HasFactory;
    protected $table = 'type_blog';
    protected $primaryKey = 'id_type';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'type_name','describe',	'total_blog'
    ];

    public $timestamps = false;
    // protected function casts(): array
    // {
    //     return [
    //         'updated_at' => 'datetime',
    //         'created_at' => 'datetime',
    //     ];
    // }
}
