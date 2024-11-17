<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       $blog_types = json_decode(file_get_contents(database_path('blogTypes.json')), true);
       DB::table('type_blog')->insert($blog_types);
        
    }
}
