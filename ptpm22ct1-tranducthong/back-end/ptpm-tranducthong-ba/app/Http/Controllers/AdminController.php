<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use App\Models\Author;
use App\Models\Blog;
use App\Models\ListBlogByType;
use App\Models\TypeBlog;
use App\Http\Controllers\BlogTypeController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function getTotalInfor(Request $request)
    {
        if ($this->validateAdminRole($request)) {
            try {
                $commentsCount = Comment::count();
                $userCount = User::count();
                $authorCount = Author::count();
                $blogCount = Blog::count();
                $totalView = Blog::sum('view');

                return response()->json([
                    'success' => 'Get page data successfully',
                    'data' => [
                        'total_comment' => $commentsCount,
                        'total_user' => $userCount,
                        'total_author' => $authorCount,
                        'total_blog' => $blogCount,
                        'total_view' => $totalView
                    ]

                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Can not get blog total informations',
                    'message' => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'error' => 'User unauthorized'
        ], 401);
    }

    public function getAllUser(Request $request)
    {
        if ($this->validateAdminRole($request)) {
            try {
                $users = DB::select("SELECT 
                    users.user_id, users.name, users.email,
                    users.created_at, COUNT(comments.id_comment) AS comment_count, authors.name_author
                        FROM 
                            users
                        LEFT JOIN 
                            comments ON comments.user_id = users.user_id
                        LEFT JOIN 
                            authors ON authors.user_id = users.user_id
                        GROUP BY users.user_id, users.name, users.email, authors.name_author,
                    users.created_at;
                ");

                return response()->json([
                    'success' => 'Get all user successfully',
                    'data' => $users
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Can not get blog user',
                    'message' => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'error' => 'User unauthorized'
        ], 401);
    }

    public function getAllAuthor(Request $request)
    {
        if ($this->validateAdminRole($request)) {
            try {
                $authors = DB::select("SELECT authors.id_author, authors.name_author,
                authors.phone_number, authors.user_id, users.email, COUNT(blogs.id_blog) AS total_blog, 
                SUM(blogs.view) AS total_view FROM authors
                    INNER JOIN users ON users.user_id = authors.user_id
                    LEFT JOIN blogs ON blogs.id_author = authors.id_author
                    GROUP BY authors.id_author, authors.name_author, 
                authors.phone_number, authors.user_id, users.email;
               ");

                return response()->json([
                    'success' => 'Get all author successfully',
                    'data' => $authors
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Can not get blog authors',
                    'message' => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'error' => 'User unauthorized'
        ], 401);
    }

    public function getAllComment(Request $request)
    {
        if ($this->validateAdminRole($request)) {
            try {
                $comments = Comment::all();
                return response()->json([
                    'success' => 'Get all comment successfully',
                    'data' => $comments
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Can not get blog comments',
                    'message' => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'error' => 'User unauthorized'
        ], 401);
    }

    public function getAllBlog(Request $request)
    {
        if ($this->validateAdminRole($request)) {
            try {
                $blogs = DB::select("
                SELECT blogs.name_blog, blogs.id_blog, authors.name_author,
                       COUNT(comments.id_comment) AS total_comment, 
                       blogs.view,
                       GROUP_CONCAT(type_blog.type_name) AS type_names
                FROM blogs
                INNER JOIN authors ON authors.id_author = blogs.id_author
                LEFT JOIN comments ON comments.id_blog = blogs.id_blog
                INNER JOIN list_blog_by_type AS list_bl ON list_bl.id_blog = blogs.id_blog
                INNER JOIN type_blog ON type_blog.id_type = list_bl.id_type
                GROUP BY blogs.name_blog, blogs.id_blog, authors.name_author, blogs.view
            ");

                $blogs = collect($blogs);
                $results = $blogs->map(function ($item) {
                    return [
                        'id_blog' => $item->id_blog,
                        'name_blog' => $item->name_blog,
                        'view' => $item->view,
                        'total_comment' => $item->total_comment,
                        'type_names' => array_unique(explode(',', $item->type_names)), // Chuyển chuỗi thành mảng
                        'name_author' => $item->name_author,
                    ];
                });


                return response()->json([
                    'success' => 'Get all blog successfully',
                    'data' => $results
                ], 200);
            } catch (\Exception $e) {
                return response()->json([
                    'error' => 'Can not get blog ',
                    'message' => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'error' => 'User unauthorized'
        ], 401);
    }
}
