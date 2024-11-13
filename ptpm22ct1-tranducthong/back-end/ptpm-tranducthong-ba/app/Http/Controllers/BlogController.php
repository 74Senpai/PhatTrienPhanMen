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

    private function createListBlogByType(int $id_blog, array $type_blog){
        DB::beginTransaction();
        foreach ($type_blog as $typeBlog) {
            $exist_type = TypeBlog::where('id_type', $typeBlog)->exists();
            if (!$exist_type) {
                DB::rollBack();
                return false;
            }
            $exist = TypeBlog::where(['id_type', 'id_blog'], [$typeBlog, $id_blog])->exists();
            ListBlogByType::create([
                'id_type' => $typeBlog,
                'id_blog' => $id_blog,
            ]);
        }
        DB::commit();
        return true;
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
    public function create( Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name_blog'     => 'required|string|max:255|unique:blogs',
            'id_author'     => 'required|int',
            'content_blog'  => 'required|string',
            'type_blog'     => 'required|array',
            'type_blog.*'   => 'int'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            DB::beginTransaction();
            $user = $request->user();
            $id_author = Author::where('user_id', $user->user_id)->first();
            if (!$id_author) {
                return response()->json(['error' => 'Author not found'], 404);
            }

            $blog = Blog::create([
                'name_blog'     =>  $request->name_blog,
                'id_author' => $id_author,
                'content_blog' => $request->content_blog,
            ]);

            $createListBlogByType = $this->createListBlogByType($blog->id_blog, $request->type_blog);
            if(!$createListBlogByType)
                DB::rollBack();

            DB::commit();
            return response()->json(['message' => 'Blog created successfully', 'blog' => $blog], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Create blog failed'], 500);
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
        if(!$user_access)
            return ;
        
        switch($user->id_role){
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
    private function authorUpdate(int $id_blog, $data_update){
        $blog = Blog::where('id_blog', '=', $id_blog)->first();

        
        if($blog != null){
            DB::beginTransaction();

            $deleted = DB::table('list_blog_by_type')->where('id_blog', '=', $id_blog)->delete();
            if(!$deleted){
                DB::rollBack();
                return false;
            }

            $blog->content_blog = $data_update->content;

            $createListBlogByType = $this->createListBlogByType($id_blog, $data_update->type_blog);
            if(!$createListBlogByType){
                DB::rollBack();
                return false;
            }
            DB::commit();
            return true;
        }
    }
    public function update(Request $request)
    {
        $user = $request->user();
        $user_access = Role::where('id_role', $user->id_role)->exists();
        if(!$user_access)
            return ;
        
        switch($user->id_role){
            case config('roles.admin'):
                break;
            case config('roles.author'):
                $data = [
                    'content' => $request->content_blog,
                    'type_blog' => $request->type_blog
                ];
                $result = $this->authorUpdate($request->id_blog, $data);
                if(!$result)
                    return  response()->json(['error' => 'Can not update blog'], 500);

            case config('roles.user'):
                break;
            default:
                return response()->json(['error' => 'Can not find user role'], 500);
        } 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $user = $request->user();
        $user_access = Role::where('id_role', $user->id_role)->exists();
        if(!$user_access)
            return ;

        $blog = Blog::where('id_blog', '=', $request->id_blog)->first();    

        switch($user->id_role){
            case config('roles.admin'):
                break;
            case config('roles.author'):
                $author = Author::where('user_id', $user->user_id)->first();
                if($author->id_author == $blog->id_author){
                    DB::beginTransaction();
                    $deleted_references = DB::table('list_blog_by_type')
                                                ->where('id_blog', '=', $blog->id_blog)
                                                ->delete();
                    $delete_blog = $blog->delete();
                    if(!$delete_blog || !$deleted_references){
                        DB::rollBack();
                        return response()->json(['error' => 'Can not delete blog'], 500);
                    }
                    DB::commit();
                    return response()->json(['success' => 'Blog deleted successfully'], 200);
                }
                return response()->json(['error' => 'Can not delete blog'], 500);
            case config('roles.user'):
                break;
            default:
                return response()->json(['error' => 'Can not find user role'], 500);
        }   
    }
}
