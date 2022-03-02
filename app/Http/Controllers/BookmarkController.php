<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Article;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class BookmarkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Article/Pages/Bookmarks', [
            'bookmarks' => Auth::user()->bookmarked_articles()->orderBy("created_at", "desc")->paginate(8)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Auth::check()) {
            $article = Article::find($request->article_id);
            $article->bookmarked_users()->attach(Auth::id());

            return "ok";
        } else {
            return "/login";
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($article_id)
    {
        if (Auth::check()) {
            $user = Auth::user();

            return $user->bookmarked_articles->where('id', $article_id);
        } else {
            return [];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($article_id)
    {
        $article = Article::find($article_id);
        $article->bookmarked_users()->detach(Auth::id());

        return redirect()->back();
    }
}
