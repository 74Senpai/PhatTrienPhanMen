<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Author;
use App\Models\ListBlogByType;
use App\Models\TypeBlog;
use App\Models\Role;


use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AuthorController extends Controller
{
    public function getAllBlogInformation(Request $request){
        if(!$this->validateAuthorRole($request)){
            return response()->json([
                'error' => 'Unauthorized to query'
            ], 401);
        }

        $user = $request->user();
        $author = Author::where('user_id', '=', $user->user_id)->first();

        try{
            $blogs = Blog::where('id_author', $author->id_author)->get();
            if($blogs == null){
                return response()->json([
                    'success' => 'Query data successfull !!!',
                    'message' => 'No blogs found for the author'
                ],  200);
            }

            $blogs_infor = DB::select(
                "SELECT blogs.id_blog, blogs.name_blog, blogs.view, blogs.updated_at,
                                blogs.show_type, type_blog.id_type, type_blog.type_name, 
                                comments.id_comment
                        FROM blogs
                            INNER JOIN list_blog_by_type as list_type on list_type.id_blog = blogs.id_blog
                            INNER JOIN type_blog on type_blog.id_type = list_type.id_type
                            LEFT JOIN comments on comments.id_blog = blogs.id_blog
                        WHERE id_author = ? ", [$author->id_author]);

            $blogs_infor = collect($blogs_infor);
            $groupedBlogs = $blogs_infor->groupBy('id_blog');
            $result = $groupedBlogs->map(function ($items, $id_blog) {
                $types = $items->pluck('id_type')->toArray(); // Lấy tất cả id_type
                $typeNames = $items->pluck('type_name')->toArray(); // Lấy tất cả type_name
        
                return [
                    'id_blog' => $id_blog,
                    'name_blog' => $items->first()->name_blog, // Giữ lại name_blog
                    'view' => $items->first()->view, // Giữ lại view
                    'updated_at' => $items->first()->updated_at, // Giữ lại updated_at
                    'show_type' => $items->first()->show_type, // Giữ lại show_type
                    'id_types' => $types, // Mảng các id_type
                    'type_names' => $typeNames // Mảng các type_name
                ];
            });

            return response()->json([
                'success'   => 'Query data successfully !!!!',
                'data'      => $result
            ], 200);

        }catch(\Exception $e){
            return response()->json([
                'error'     => 'Can not query data',
                'message'   => $e->getMessage()
            ], 500);
        }
        
    }
}
