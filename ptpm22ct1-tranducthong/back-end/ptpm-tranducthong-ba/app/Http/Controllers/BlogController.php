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


class BlogController extends Controller
{

    private function createListBlogByType(int $id_blog, $type_blog)
    {
        DB::beginTransaction();

        try {
            if (empty($type_blog) || !is_array($type_blog)) {
                return false;
            }

            foreach ($type_blog as $typeBlog) {
                $exist_type = TypeBlog::where('id_type', $typeBlog)->exists();
                if (!$exist_type) {
                    return false;
                }

                $exist = ListBlogByType::where([
                    ['id_type', '=', $typeBlog],
                    ['id_blog', '=', $id_blog],
                ])->exists();
                
                if (!$exist) {
                    $created = ListBlogByType::create([
                        'id_type' => $typeBlog,
                        'id_blog' => $id_blog,
                    ]);

                    $blog_on_type = TypeBlog::find($typeBlog);
                    $blog_on_type->total_blog += 1;
                    $blog_on_type->save();                    

                    if (!$created) {
                        return false;
                    }
                }
            }
            DB::commit();
            return true;
        } catch (\Exception $e) {
            DB::rollBack();
            return false;
        }
    }

    private function removeBlogInList(int $id_blog){
        try{
            DB::beginTransaction();
            $results = DB::table('list_blog_by_type')
                ->where('id_blog', $id_blog)
                ->get();
            
            $id_types = $results->pluck('id_type')->toArray();  
            TypeBlog::whereIn('id_type', $id_types)->decrement('total_blog'); 

            DB::table('list_blog_by_type')
                ->where('id_blog', $id_blog)
                ->delete();

            DB::commit();
            return true;
        }catch(\Exception $e){
            DB::rollBack();
            return false;
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    //create v
    public function createBlog(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_blog'     => 'required|string|max:255|unique:blogs',
            'content_blog'  => 'required|string',
            'type_blog'     => 'required|array',
            'type_blog.*'   => 'int',
            'blog_describe' => 'required|string|max:255',
            'thumbnail'     => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'show_type'     => 'required|int'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        DB::beginTransaction();
        $path = null;
        if ($request->hasFile('thumbnail')) {
            $path = $request->file('thumbnail')->store('images', 'public');
        }
        try {
            $user = $request->user();
            $author = Author::where('user_id', $user->user_id)->first();

            // Kiểm tra tác giả
            if ($author == null) {
                DB::rollBack(); 
                return response()->json(['error' => 'Author not found'], 404);
            }

            // Tạo blog
            $blog = Blog::create([
                'name_blog'     => $request->name_blog,
                'id_author'     => $author->id_author,
                'content_blog'  => $request->content_blog,
                'view'          => 0,
                'blog_describe' => $request->blog_describe,
                'thumbnail'     => $path,
                'show_type'     => $request->show_type
            ]);

            // Tạo danh sách loại blog
            $createListBlogByType = $this->createListBlogByType($blog->id_blog, $request->type_blog);
            if (!$createListBlogByType) {
                return response()->json(['error' => 'Failed to create ListBlogByType'], 500);
            }

            DB::commit();  // Commit giao dịch nếu không có lỗi
            return response()->json(['message' => 'Blog created successfully'], 201);

        } catch (\Exception $e) {
            // Rollback nếu có lỗi trong try block
            DB::rollBack();
            return response()->json([
                'error' => 'Create blog failed',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request)
    // {
    //     //
    // }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $user = $request->user();
        $user_access = Role::where('id_role', $user->id_role)->exists();
        if (!$user_access)
            return;

        switch ($user->id_role) {
            case config('roles.admin'):
                break;
            case config('roles.author'):
                break;
            case config('roles.user'):
                break;
            default:
                return response()->json(['error' => 'Can not find user role'], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        //c
    }

    /**
     * Update the specified resource in storage.
     */
   

    public function updateBlog(Request $request){
        $user = $request->user();
        if($user->id_role == config('roles.admin') || $user->id_role == config('roles.author')){
            $validate = Validator::make($request->all(), [
                'id_blog'       => 'int|required',
                'name_blog'     => 'required|string|max:255|unique:blogs',
                'content_blog'  => 'required|string',
                'type_blog'     => 'required|array',
                'type_blog.*'   => 'int',
                'blog_describe' => 'required|string|max:255',
                'thumbnail'     => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'show_type'     => 'required|int'
            ]);

            if($validate->fails()){
                return response()->json([
                    'error'     => 'Data not validity',
                    'message'   => $validate
                ],400);
            }
            
            DB::beginTransaction();
            try{
                $blog = Blog::find($request->id_blog);
                if($blog == null){
                    DB::rollBack();
                    return response()->json([ 'error' => 'Not found'], 404);
                }

                if($user->id_role == config('roles.author')){
                    $author = Author::find($blog->id_author);
                    if($author == null){
                        DB::rollBack();
                        return response()->json(['error' => 'Can not find author'],404);
                    }

                    if($author->user_id != $user->user_id){
                        DB::rollBack();
                        return response()->json(['error' => 'Author unauthorized to update'],401);
                    }
                }

                $path = null;
                if ($request->hasFile('thumbnail')) {
                    $path = $request->file('thumbnail')->store('images', 'public');
                }
                $blog->name_blog    = $request->name_blog;
                $blog->content_blog = $request->content_blog;
                $blog->show_type    = $request->show_type;
                $blog->blog_describe= $request->blog_describe;
                $blog->thumbnail    = $path;

                $removeInList       = $this->removeBlogInList($request->id_blog); 
                if(!$removeInList){
                    DB::rollBack();
                    return response()->json([
                        'error' => 'Update cascade issue when remove blog type '
                    ],501);
                }
                $addInList          = $this->createListBlogByType($request->id_blog, $request->type_blog);

                if(!$addInList){
                    DB::rollBack();
                    return response()->json([
                        'error' => 'Update cascade issue when add blog type '
                    ],501);
                }

                $blog->save();
                DB::commit();
                return response()->json([
                    'success' => 'Update successfully !!!'
                ], 201);
 
            }catch(\Exception $e){
                DB::rollBack();
                return response()->json([
                    'error'     => 'Can not  update blog',
                    'message'   => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'error'     => 'Unauthorized to update',
            'message'   => 'Please use author account !!!'
        ], 401);
    }
    
    //Delete v
    public function destroyBlog(Request $request, int $id)
    {
        $user = $request->user();
        $user_access = Role::where('id_role', $user->id_role)->exists();
        if (!$user_access)
            return;

        $blog = Blog::where('id_blog', '=', $id)->first();

        switch ($user->id_role) {
            case config('roles.admin'):
                DB::beginTransaction();
                $deleted_references = DB::table('list_blog_by_type')
                    ->where('id_blog', '=', $blog->id_blog)
                    ->delete();
                $delete_blog = $blog->delete();
                if (!$delete_blog || !$deleted_references) {
                    DB::rollBack();
                    return response()->json(['error' => 'Can not delete blog id: '.$id], 500);
                }
                DB::commit();
                return response()->json(['success' => 'Blog deleted successfully'], 200);
            
            case config('roles.author'):
                $author = Author::where('user_id', $user->user_id)->first();
                if ($author->id_author == $blog->id_author) {
                    DB::beginTransaction();
                    try{

                        $deleted_references = DB::table('list_blog_by_type')
                            ->where('id_blog', '=', $blog->id_blog)
                            ->delete();
                        $delete_blog = $blog->delete();
                        if (!$delete_blog || !$deleted_references) {
                            DB::rollBack();
                            return response()->json(['error' => 'Can not delete blog'], 500);
                        }
                        DB::commit();
                    }catch(\Exception $e){
                        DB::rollBack();
                        return response()->json([
                            'error' => 'Can not delete blog',
                            'message' => $e->getMessage()
                        ], 500);
                    }
                    return response()->json(['success' => 'Blog deleted successfully'], 200);
                }
                
                return response()->json(['error' => 'Can not delete blog'], 500);
            default:
                return response()->json(['error' => 'Can not find user role'], 500);
        }
    }

    //Show all v
    public function showAllBlogs(Request $request)
    {
        // $blogs = Blog::all();
        
        $blogs_infor = DB::select(
            "SELECT blogs.id_blog, blogs.name_blog, blogs.view, blogs.updated_at,
                            blogs.show_type, type_blog.id_type, type_blog.type_name, 
                            comments.id_comment
                    FROM blogs
                        INNER JOIN list_blog_by_type as list_type on list_type.id_blog = blogs.id_blog
                        INNER JOIN type_blog on type_blog.id_type = list_type.id_type
                        LEFT JOIN comments on comments.id_blog = blogs.id_blog
                    ");

        $blogs_infor = collect($blogs_infor);
        $groupedBlogs = $blogs_infor->groupBy('id_blog');
        $result = $groupedBlogs->map(function ($items, $id_blog) {
            $types = $items->pluck('id_type')->toArray(); // Lấy tất cả id_type
            $typeNames = $items->pluck('type_name')->toArray(); // Lấy tất cả type_name
            $blog_comment = $items->pluck('id_comment')->toArray();
    
            return [
                'id_blog' => $id_blog,
                'name_blog' => $items->first()->name_blog, // Giữ lại name_blog
                'view' => $items->first()->view, // Giữ lại view
                'updated_at' => $items->first()->updated_at, // Giữ lại updated_at
                'show_type' => $items->first()->show_type, // Giữ lại show_type
                'id_types' => $types, // Mảng các id_type
                'type_names' => $typeNames, // Mảng các type_name
                'id_comments' => $blog_comment
            ];
        });

        return response()->json([
            'success'   => 'Query data successfully !!!!',
            'data'      => $result
        ], 200);
        
        // 
    }

    public function showBlogById(Request $request, int $id)
    {
        $blog = Blog::find($id);
        $blog->thumbnail = url('storage/' . $blog->thumbnail);
        return response()->json([
            'success' => 'Get blog success',
            'data' => $blog
        ], 200);
    }

    public function getBlogByType(Request $request, string $type_name){
        try{
            $blogs = DB::select(
                "SELECT * FROM type_blog 
                            INNER JOIN list_blog_by_type as list_blog on list_blog.id_type = type_blog.id_type 
                            INNER JOIN blogs on blogs.id_blog = list_blog.id_blog 
                        WHERE type_blog.type_name = ?
                ", [$type_name]);
            foreach($blogs as $blog){
                $blog->thumbnail = url('storage/' . $blog->thumbnail);
            }
            return response()->json([
                'success'   => 'Get blog by type '.$type_name.' successfully !!!',
                'data'      => $blogs
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'error'     => 'Can not get blog ',
                'message'   => $e->getMessage()
            ], 500);
        }
    }

    public function getBlogByViews(Request $request){
        try{
            $blogs = DB::select(
                "SELECT * FROM type_blog 
                            INNER JOIN list_blog_by_type as list_blog on list_blog.id_type = type_blog.id_type 
                            INNER JOIN blogs on blogs.id_blog = list_blog.id_blog 
                        ORDER BY view DESC
                       ");
            foreach($blogs as $blog){
                $blog->thumbnail = url('storage/' . $blog->thumbnail);
            }
            return response()->json([
                'success'   => 'Get blog oder by view successfully',
                'data'      => $blogs
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'error' => 'Can not get blog ',
                'message' => $e->getMessage()
            ],500);
        }
    }

    public function findByName(Request $request, String $name_blog){
        try{

            $blogRaw = DB::select("SELECT * FROM blogs 
                                    INNER JOIN authors ON authors.id_author = blogs.id_author
                                WHERE blogs.name_blog = ?",
                        [$name_blog]);
            
            $blog = $blogRaw[0];
            DB::update("UPDATE blogs SET view = ? WHERE id_blog = ?", [$blog->view + 1, $blog->id_blog]);
            
           
            
            return response()->json([
                'success'   => 'Get blog by name successfully',
                'data'      => $blog
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'error' => 'Can not get blog ',
                'message' => $e->getMessage()
            ],500);
        }
    }
}
