<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoteController extends Controller
{
    public function votes($post_id) {
        $comment = Comment::find($post_id);
        
        return [$comment->upvote_users->pluck('id'), $comment->downvote_users->pluck('id')];
    }

    public function up($post_id) {
        if (Auth::check()) {
            $comment = Comment::find($post_id);

            $user_id = Auth::id();

            $down_users = $comment->downvote_users;
            $up_users = $comment->upvote_users;

            if ($up_users->contains($user_id)) {
                $comment->upvote_users()->detach($user_id);
            } else {
                if ($down_users->contains($user_id)) $comment->downvote_users()->detach($user_id);
                $comment->upvote_users()->attach($user_id);
            }

            return 'ok';
        } else {
            return '/login';
        }
    }

    public function down($post_id) {
        if (Auth::check()) {
            $comment = Comment::find($post_id);
            $user_id = Auth::id();

            $down_users = $comment->downvote_users;
            $up_users = $comment->upvote_users;

            if ($down_users->contains($user_id)) {
                $comment->downvote_users()->detach($user_id);
            } else {
                if ($up_users->contains($user_id)) $comment->upvote_users()->detach($user_id);
                $comment->downvote_users()->attach($user_id);
            }

            return 'ok';
        } else {
            return '/login';
        }
    }


}
