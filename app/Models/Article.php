<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content'
    ];

    public function user() {
        return $this->belongsTo(User::class)->withDefault([
            'name' => 'Guest Author'
        ]);
    }

    public function bookmarked_users() {
        return $this->belongsToMany(User::class, 'user_article', 'article_id', 'bookmarked_user_id')->withTimestamps();
    }

    public function upvote_users() {
        return $this->belongsToMany(User::class, 'user_article', 'article_id', 'upvote_user_id')->withTimestamps();
    }

    public function downvote_users() {
        return $this->belongsToMany(User::class, 'user_article', 'article_id', 'downvote_user_id')->withTimestamps();
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function images() {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class, 'article_tag', 'article_id', 'tag_id')->withTimestamps();
    }
}
