<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'article_id',
        'content',
        'parent_id'
    ];

    public function user() {
        return $this->belongsTo(User::class)->withDefault([
            'name' => 'Guest Author'
        ]);
    }

    public function article() {
        return $this->belongsTo(Article::class);
    }

    public function replies() {
        return $this->belongsToMany(Comment::class, 'comment_reply', 'comment_id', 'reply_id')->withTimestamps();
    }

    public function show_replies() {
        $replies = $this->replies;
        if (empty($replies))
            return $replies;

        foreach ($replies as $reply)
        {
            //$reply->load('replies');
            $replies = $replies->merge($reply->show_replies());
        }

        return $replies;
    }
}
