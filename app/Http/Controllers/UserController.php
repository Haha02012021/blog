<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Article;
use App\Models\Image;
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
            'avatar' => $user->image ? asset('images/'.$user->image->name) : null
        ];
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
