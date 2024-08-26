<?php
use Illuminate\Support\Facades\DB;

$users = DB::select("SELECT * FROM test");

foreach ($users as $user) {
    echo 'id_test : '.$user->id_test.' <br/>';
}