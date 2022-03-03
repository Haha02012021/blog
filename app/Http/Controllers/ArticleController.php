<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Comment;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Article/Pages/Index', [
            'articles' => Article::orderBy('updated_at', 'desc')->paginate(8)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user = Auth::user();

        $images = [];

        if ($user->get_article_images) {
            foreach($user->get_article_images as $image) {
                array_push($images, asset('images/'.$image->name));
            }
        }

        return Inertia::render('Article/Pages/Add', [
            'imagesLib' => $images
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
        $request->validate([
            'user_id' => 'integer|required',
            'title' => 'string|required',
            'content' => 'string|required'
        ]);

        $article = Article::create([
            'user_id' => $request->user_id,
            'title' => $request->title,
            'content' => $request->content
        ]);

        return redirect()->route("articles.show", $article->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $article = Article::find($id);
 
        return Inertia::render('Article/Pages/Show', [
            'article' => $article,
            'comments' => Comment::where('article_id', $id)->orderBy('updated_at', 'desc')->paginate(8),
            'bookmarkedUsers' => $article ? $article->bookmarked_users : null,
            'canControl' => Gate::inspect('update', $article)->allowed(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $article = Article::findOrFail($id);
        Gate::authorize('update', $article);
        return Inertia::render("Article/Pages/Add", [
            'article' => $article
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $article = Article::find($id);

        Gate::authorize('update', $article);

        $article->title = $request->title;
        $article->content = $request->content;

        $article->update();

        return redirect()->route("articles.show", $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $article = Article::find($id);

        Gate::authorize('delete', $article);

        $article->delete();

        return redirect()->intended('/articles/show/'.$id);
    } 
}
