<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_role';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'name_role', 'describe',
    ];
}
