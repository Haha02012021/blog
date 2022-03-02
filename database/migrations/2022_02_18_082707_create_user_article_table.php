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
        Schema::create('user_article', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('article_id')->unsigned()->nullable();
            $table->foreign('article_id')
                ->references('id')->on('articles')
                ->onDelete('cascade');
            $table->bigInteger('bookmarked_user_id')->unsigned()->nullable();
            $table->foreign('bookmarked_user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
            $table->bigInteger('upvote_user_id')->unsigned()->nullable();
            $table->foreign('upvote_user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
            $table->bigInteger('downvote_user_id')->unsigned()->nullable();   
            $table->foreign('downvote_user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
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
        Schema::dropIfExists('user_article');
    }
};
