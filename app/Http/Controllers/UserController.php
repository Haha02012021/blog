<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Article;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function get($id) {
        $user = User::findOrFail($id);
        return [
            'user' => $user, 
            'articles' => Article::where('user_id', $id)->get(), 
            'avatar' => $user->getAvatar ? asset('images/'.$user->getAvatar->name) : null
        ];
    }

    public function get_article_images($id) {
        $user = User::findOrFail($id);

        $images = [];

        if ($user->get_article_images) {
            foreach($user->get_article_images as $image) {
                array_push($images, asset('images/'.$image->name));
            }
        }
        return $images;
    }

    public function show_articles($id) {
        return Inertia::render("User/Pages/ShowArticles", [
            'user' => User::findOrFail($id),
            'articlesOfUser' => Article::where('user_id', $id)->orderBy('updated_at', 'desc')->paginate(8)
        ]);
    }

    public function show_bookmarks($id) {
        $user = User::findOrFail($id);
        return Inertia::render("User/Pages/ShowBookmarks", [
            'user' => $user,
            'bookmarksOfUser' => $user->bookmarked_articles()->orderBy("created_at", "desc")->paginate(8)
        ]);
    }
}
