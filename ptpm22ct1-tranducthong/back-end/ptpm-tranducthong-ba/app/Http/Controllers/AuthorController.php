<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Author;
use App\Models\Comment;
use App\Models\User;
use App\Models\ListBlogByType;
use App\Models\TypeBlog;
use App\Models\Role;


use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class AuthorController extends Controller
{
    public function getAllBlogInformation(Request $request)
    {
        if (!$this->validateAuthorRole($request)) {
            return response()->json([
                'error' => 'Unauthorized to query'
            ], 401);
        }

        $user = $request->user();
        $author = Author::where('user_id', '=', $user->user_id)->first();

        try {
            $blogs = Blog::where('id_author', $author->id_author)->get();
            if ($blogs == null) {
                return response()->json([
                    'success' => 'Query data successfull !!!',
                    'message' => 'No blogs found for the author'
                ], 200);
            }

            $blogs_infor = DB::select(
                "SELECT blogs.id_blog, blogs.name_blog, blogs.view, blogs.updated_at, blogs.content_blog,
                        blogs.show_type, type_blog.id_type, type_blog.type_name
                 FROM blogs
                     INNER JOIN list_blog_by_type as list_type ON list_type.id_blog = blogs.id_blog
                     INNER JOIN type_blog ON type_blog.id_type = list_type.id_type
                 WHERE id_author = ? ",
                [$author->id_author]
            );

            $blogs_infor = collect($blogs_infor);
            $blogIds = $blogs_infor->pluck('id_blog')->unique(); // Lấy tất cả id_blog
            $allComments = Comment::join('users', 'comments.user_id', '=', 'users.user_id')
                                    ->whereIn('id_blog', $blogIds)
                                    ->get(); // Truy vấn tất cả comments một lần
            $commentsGroupedByBlog = $allComments->groupBy('id_blog'); // Nhóm comments theo id_blog

            // $userIds = $$allComments->pluck('user_id')->unique();
            // $allUserComment = User::whereIn('user_id', $userIds)->get();


            $groupedBlogs = $blogs_infor->groupBy('id_blog');

            $result = $groupedBlogs->map(function ($items, $id_blog) use ($commentsGroupedByBlog) {
                $type_blogs = $items->filter(fn($item) => $item->id_type !== null)
                    ->map(function ($item) {
                        return [
                            'id_type' => $item->id_type,
                            'type_name' => $item->type_name
                        ];
                    })->unique('id_type');

                $comments = $commentsGroupedByBlog->get($id_blog, collect())->map(function ($comment) {
                    return [
                        'id_comment' => $comment->id_comment,
                        'content_comment' => $comment->content_comment,
                        'day_comment' => $comment->day_comment,
                        'id_parent_comment' => $comment->id_parent_comment,
                        'user_id' => $comment->user_id,
                        'user_name' => $comment->name
                    ];
                });

                return [
                    'id_blog' => $id_blog,
                    'name_blog' => $items->first()->name_blog, // Giữ lại name_blog
                    'view' => $items->first()->view, // Giữ lại view
                    'updated_at' => $items->first()->updated_at, // Giữ lại updated_at
                    'show_type' => $items->first()->show_type, // Giữ lại show_type
                    'type_blog' => $type_blogs,
                    'comments' => $comments->values(), // Loại bỏ index
                    'blog_content' => $items->first()->content_blog,
                ];
            });




            // $comments = $items->filter(fn($item) => $item->id_comment !== null && $item->id_blog !== null)
            // ->map(function ($item) {
            //     return [
            //         'id_comment'        => $item->id_comment,
            //         'content_comment'   => $item->content_comment,
            //         'day_comment'       => $item->day_comment,
            //         'id_parent_comment' => $item->id_parent_comment,
            //         'user_id'           => $item->user_id,
            //     ];
            // })
            // ->unique('id_comment') // Loại bỏ các mục có cùng id_comment
            // ->values()
            // ->toArray();


            return response()->json([
                'success' => 'Query data successfully !!!!',
                'data' => $result
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Can not query data',
                'message' => $e->getMessage()
            ], 500);
        }

    }
}
