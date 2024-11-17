<?php

namespace App\Http\Controllers;

use App\Models\TypeBlog;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;


class BlogTypeController extends Controller
{

    //Create
    public function createNewBlogType(Request $request){
        $role = $this->validateAdminRole($request);
        if(!$role){
            return response()->json([
                'error' => 'No access'
            ], 401);
        } 

        $validateData = Validator::make($request->all(),[
            'type_name' => 'required|string|max:50|unique:type_blog',
            'describe'  => 'required|string|max:255'
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'error' => 'Data error',
                'messages' => $validateData->errors()
            ], 400);
        }
        try{
            DB::beginTransaction();

            TypeBlog::create([
                'type_name'     => $request->type_name,
                'describe'      => $request->describe,
                'total_blog'    => 0
            ]);

            DB::commit();
            return response()->json([
                'success' => 'Create new type successfully'
            ], 201);

        }catch(\Exception $e){
            DB::rollBack();

            return response()->json([
                'error' => 'Can not create new type',
                'message' => $e->getMessage()
            ], 501);
            
        }
    }

    //Read 
    public function readAllBlogType(){
        try{
            $blog_types = TypeBlog::all();

            
            if($blog_types == null)
                return response()->json(['error'=>'Not found'], 404);

            return response()->json([
                'success'   => 'Get data successfully',
                'data'      => $blog_types
            ], 302);
            
        }catch(\Exception $e){
            return response()->json([
                'error' => 'Get data faild'
            ], 501);
        }
    }

    public function readBlogTypeById(int $id){
        try{
            $blog_type = TypeBlog::find($id);
                if($blog_type == null)
                    return response()->json(['error'=>'Not found'], 404);

            return response()->json([
                'success'   => 'Get data successfully',
                'data'      => $blog_type
            ], 302);    
            
        }catch(\Exception $e){
            return response()->json([
                'error'     => 'Can not get ',
                'id'        => $id,
                'message'   => $e->getMessage(),
            ],501);
        }
    }
}
