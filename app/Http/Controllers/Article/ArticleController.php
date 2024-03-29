<?php

namespace App\Http\Controllers\Article;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Comment;
use App\Models\Tag;
use Inertia\Inertia;
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
        return Inertia::render('Article/Pages/Add');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //dd($request->tags);
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

        if ($request->tags) {
    
            foreach ($request->tags as $tag) {
                $newTag = Tag::firstOrCreate(['name' => $tag]);

                $article->tags()->attach($newTag->id);
            }
            
        }
    

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

        $comments = Comment::where('article_id', $id)
                    ->where('parent_id', null)
                    ->orderBy('updated_at', 'desc')
                    ->with('replies')
                    ->paginate(8);

        $comments->getCollection()->transform(function ($value) {
            // Your code here
            $value->children = $value->show_replies($value);
            $value->number_children = count($value->children);
            
            return $value;
        });

        //dd($article->tags->map->only('name'));
 
        return Inertia::render('Article/Pages/Show', [
            'article' => $article,
            'comments' => $comments,
            'tags' => $article ? $article->tags->map->only('name') : null,
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
            'article' => $article,
            'tags' => $article->tags->pluck('name')->toArray()
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

        if ($request->tags) {
    
            foreach ($request->tags as $tag) {
                $newTag = Tag::firstOrCreate(['name' => $tag]);

                $article->tags()->attach($newTag->id);
            }
            
        }

        $article->save();

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
