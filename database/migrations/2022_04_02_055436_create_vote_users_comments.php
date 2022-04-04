<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('vote_users_comments');
        
        Schema::create('vote_users_comments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('comment_id')->unsigned();
            $table->foreign('comment_id')->references('id')->on('comments')->onDelete('cascade');
            $table->bigInteger('upvote_user_id')->unsigned()->nullable();
            $table->foreign('upvote_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('downvote_user_id')->unsigned()->nullable();
            $table->foreign('downvote_user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('upvote_users_comments');
    }
};
