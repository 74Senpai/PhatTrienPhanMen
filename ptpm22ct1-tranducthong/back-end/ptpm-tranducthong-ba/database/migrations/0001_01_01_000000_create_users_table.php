<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {   
        Schema::create('roles', function(Blueprint $table) {
            $table->integer('id_role')->primary()->index();
            $table->string('name_role', 255)->unique();
            $table->text('describe');
        });
        
        Schema::create('users', function (Blueprint $table) {
            $table->integer('user_id')->primary()->autoIncrement()->index();
            $table->string('name');
            $table->string('email')->unique()->index();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->integer('id_role')->default(1)->index();
            $table->rememberToken();
            $table->timestamps();
            $table->foreign('id_role')->references('id_role')->on('roles');
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

        Schema::create('authors', function (Blueprint $table) {
            $table->integer('id_author')->primary()->autoIncrement()->index();
            $table->string('name_author', 255)->index();
            $table->string('phone_number', 10)->unique();
            $table->integer('id_role')->index();
            $table->integer('user_id')->unique()->index();
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('id_role')->references('id_role')->on('roles');
        });

        Schema::create('blogs', function (Blueprint $table) {
            $table->integer('id_blog')->primary()->autoIncrement()->index();
            $table->string('name_blog', 255)->unique()->index();
            $table->integer('id_author')->index();
            $table->text('content_blog');
            $table->integer('view');
            $table->text('blog_describe');
            $table->text('thumbnail');
            $table->dateTime('updated_at');
            $table->dateTime('created_at');
            $table->integer('show_type')->references('id_write_type')->on('write_type')->onDelete('cascade');
            $table->foreign('id_author')->references('id_author')->on('authors')->onDelete('cascade');
        });

        Schema::create('comments', function (Blueprint $table){
            $table->integer('id_comment')->primary()->autoIncrement();
            $table->integer('user_id');
            $table->integer('id_blog');
            $table->text('content_comment');
            $table->dateTime('day_comment');
            $table->string('id_parent_comment')->nullable();
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('id_blog')->references('id_blog')->on('blogs')->onDelete('cascade');
        });

        Schema::create('type_blog', function(Blueprint $table){
            $table->integer('id_type')->primary()->autoIncrement();
            $table->string('type_name', 30)->unique();
            $table->text('describe');
            $table->integer('total_blog');
        });

        Schema::create('list_blog_by_type', function(Blueprint $table){
            $table->integer('id_blog');
            $table->integer('id_type');
            $table->primary(['id_type', 'id_blog']);
            $table->foreign('id_type')->references('id_type')->on('type_blog')->onDelete('cascade');
            $table->foreign('id_blog')->references('id_blog')->on('blogs')->onDelete('cascade');
        });

        Schema::create('write_type', function(Blueprint $table){
            $table->integer('id_write_type')->primary()->autoIncrement();
            $table->string('show_type_name')->unique();
        });

        // Schema::create('blogs_describe', function(Blueprint $table){
        //     $table->integer('id_blog')->unique()->references('id_blog')->on('blogs')->onDelete('cascade');
        //     $table->text('blog_describe');
        //     $table->text('thumbnail');
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_blog_by_type');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('type_blog');
        Schema::dropIfExists('write_type');
        Schema::dropIfExists('authors');
        Schema::dropIfExists('users');
        Schema::dropIfExists('roles');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
    }

};
