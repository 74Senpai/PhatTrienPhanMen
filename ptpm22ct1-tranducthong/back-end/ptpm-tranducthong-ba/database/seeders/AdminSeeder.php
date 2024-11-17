<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;


class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => config('admin.account.name'),
            'email' => config('admin.account.email'),
            'password' => Hash::make(config('admin.account.password')),
            'id_role' => config('admin.account.role'),
        ]);
    }
}
