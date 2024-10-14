<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;
    protected $table = 'authors';
    protected $primaryKey = 'id_author';
    protected $fillable = [
        'name_author','phone_number','id_role','user_id'
    ]; 
    public $timestamps = false;

}
