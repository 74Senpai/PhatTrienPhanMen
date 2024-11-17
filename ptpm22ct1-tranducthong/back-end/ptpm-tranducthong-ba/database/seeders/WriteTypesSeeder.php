<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WriteTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('write_type')->insert([
            [
                'show_type_name' => 'CODE',
            ],
            [
                'show_type_name' => 'MARKDOWN',
            ],
            [
                'show_type_name' => 'DEFAULT'
            ]
        ]);
    }
}
