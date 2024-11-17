<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //id_role	name_role	describ
        DB::table('roles')->insert([
            [
                'id_role' => config('roles.admin'),
                'name_role' => 'ADMIN',
                'describe' => 'Quản trị viên'
            ],
            [
                'id_role' => config('roles.user'),
                'name_role' => 'USER',
                'describe' => 'Người dùng'
            ],
            [
                'id_role' => config('roles.author'),
                'name_role' => 'AUTHOR',
                'describe' => 'Tác giả'
            ],
        ]);
    }
}
