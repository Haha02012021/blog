<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Article;


class VoteController extends Controller
{
    public function votes($article_id) {
        $article = Article::find($article_id);
        
        return [$article->upvote_users->pluck('id'), $article->downvote_users->pluck('id')];
    }

    public function up($article_id) {
        if (Auth::check()) {
            $article = Article::find($article_id);

            $user_id = Auth::id();

            $down_users = $article->downvote_users;
            $up_users = $article->upvote_users;

            if ($up_users->contains($user_id)) {
                $article->upvote_users()->detach($user_id);
            } else {
                if ($down_users->contains($user_id)) $article->downvote_users()->detach($user_id);
                $article->upvote_users()->attach($user_id);
            }

            return 'ok';
        } else {
            return '/login';
        }
    }

    public function down($article_id) {
        if (Auth::check()) {
            $article = Article::find($article_id);

            $user_id = Auth::id();

            $down_users = $article->downvote_users;
            $up_users = $article->upvote_users;

            if ($down_users->contains($user_id)) {
                $article->downvote_users()->detach($user_id);
            } else {
                if ($up_users->contains($user_id)) $article->upvote_users()->detach($user_id);
                $article->downvote_users()->attach($user_id);
            }

            return 'ok';
        } else {
            return '/login';
        }
    }
}
