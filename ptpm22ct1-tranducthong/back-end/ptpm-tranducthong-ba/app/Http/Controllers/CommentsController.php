<?php

namespace App\Http\Controllers;

use App\Models\Comment;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CommentsController extends Controller
{
    public function getAllComments( Request $request){
        $user = $request->user();
        if($user->id_role != config('roles.admin')){
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }
        try{
            $results = Comment::all();
            if(!$results){
                return response()->json([
                    'success' => 'Get all comment successfull',
                    'message' => 'No comment found'
                ], 200);
            }
            return response()->json([
                'success'   => 'Get all comment successfull',
                'data'      => $results
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'error'     => 'Can not get data',
                'message'   => $e->getMessage()
            ], 500);
        }
    }

    public function getUserAllComments(Request $request, int $user_id){
        $user = $request->user();
        if($user->id_role != config('roles.admin') && $user->user_id != $user_id){
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }
        try{
            $results = Comment::where('user_id', $user_id)->get();
            if($results == null){
                return response()->json([
                    'success' => 'Get all user comment successfull',
                    'message' => 'No comment found'
                ], 200);
            }
            return response()->json([
                'success'   => 'Get all user comment successfull',
                'data'      => $results
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'error'     => 'Can not get data',
                'message'   => $e->getMessage()
            ], 500);
        }
    }

    public function getBlogAllComments(Request $request, int $id_blog){
        try{
            $results = Comment::where('id_blog', $id_blog)->get();
            if(!$results){
                return response()->json([
                    'success' => 'Get blog all comment successfull',
                    'message' => 'No comment found'
                ], 200);
            }
            return response()->json([
                'success'   => 'Get blog all comment successfull',
                'data'      => $results
            ], 200);
        }catch(\Exception $e){
            return response()->json([
                'error'     => 'Can not get data',
                'message'   => $e->getMessage()
            ], 500);
        }
    }

    

    public function createNewComment(Request $request){
        
        $user = $request->user();
        $validate = Validator::make($request->all(), [
            'id_blog'           => 'required|int',
            'content_comment'   => 'required|string',
            'id_parent_comment' => 'int'
        ]);

        if($validate->fails()){
            return response()->json([
                'error' => $validate->errors()
            ], 422);
        }

        try{
            DB::beginTransaction();
            Comment::create([
                'user_id'           => $user->user_id,
                'id_blog'           => $request->id_blog,
                'content_comment'   => $request->content_comment,
                'day_comment'       => now(),
                'id_parent_comment' => $request->id_parent_comment ?? null
            ]);
            DB::commit();
            return response()->json([
                'success' => 'Create comment success !!!'
            ], 200);
        }catch(\Exception $e){
            DB::rollBack();
            return response()->json([
                'error'     => 'Can not create comment !!!',
                'message'   => $e->getMessage()
            ], 500);
        }
    }
}
