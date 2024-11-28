<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;


class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => config('admin.account.name'),
            'email' => config('admin.account.email'),
            'password' => Hash::make(config('admin.account.password')),
            'id_role' => config('admin.account.role'),
        ]);

        DB::table('authors')->insert([
            'name_author' => config('admin.account.name'),
            'phone_number' => config('admin.account.phone'),
            'user_id' => $admin->user_id,
            'id_role' => config('admin.account.role'),
        ]);
    }
}
