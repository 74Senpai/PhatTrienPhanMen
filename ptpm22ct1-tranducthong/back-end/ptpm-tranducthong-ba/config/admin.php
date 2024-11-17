<?php

return [
    'prefix' => env('ADMIN_PREFIX', '/admin\/'),
    'account' =>[
        'name'      => env('ADMIN_NAME', 'ADMIN_0'),
        'email'     => env('ADMIN_EMAIL', 'admin@gmail.com'),
        'password'  => env('ADMIN_PASSWORD', 'root'),
        'role'      => env('ADMIN_ROLE', 0),
    ]
];