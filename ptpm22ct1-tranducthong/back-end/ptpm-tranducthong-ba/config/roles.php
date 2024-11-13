<?php
use App\Models\Role;

return[
    'admin'     => Role::where('name_role', 'ADMIN')->first()->id_role,
    'author'    => Role::where('name_role', 'Author')->first()->id_role,
    'user'      => Role::where('name_role', 'USER')->first()->id_role,
];