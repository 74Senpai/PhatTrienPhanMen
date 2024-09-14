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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
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

        Schema::create('author', function (Blueprint $table) {
            $table->string('id_author')->primary();
            $table->string('name_author', 255);
            $table->string('author_adress',255);
            $table->string('phone_number', 10);
            $table->string('email_adress')->unique();
            $table->string('password');
        });

        Schema::create('blogs', function (Blueprint $table) {
            $table->string('id_blog')->primary();
            $table->string('name_blog', 255);
            $table->string('id_author');
            $table->text('content_blog');
        });

        Schema::create('comments', function (Blueprint $table){
            $table->string('id_comment')->primary();
            $table->string('user_id');
            $table->string('id_blog');
            $table->text('content_comment');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('author');
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('comments');
    }
};
