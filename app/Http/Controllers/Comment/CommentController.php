<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Article;
use Inertia\Inertia;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        Comment::create([
            'user_id' => 1,
            'article_id' => 1,
            'content' => 'Bình luận thử'
        ]);

        return ["Result" => "Create sucessfully!"];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $comment = Comment::create([
            'user_id' => $request->user_id,
            'article_id' => $request->article_id,
            'content' => $request->content,
            'parent_id' => $request->parent_id
        ]); 

        $comments = Comment::where('article_id', $request->article_id)
                    ->where('parent_id', null)
                    ->orderBy('updated_at', 'desc')
                    ->paginate(8);

        $comments->getCollection()->transform(function ($value) {
            // Your code here
            $value->children = $value->replies()->orderBy('updated_at')->get();
            
            return $value;
        });

        return [
            'comments' => $comments, 
            'replyId' => $comment->id
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($article_id)
    {   
        $comments = Comment::where('article_id', $article_id)
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

        return $comments;
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        $comment = Comment::find($comment->id);

        $comment->delete();

        $comments = Comment::where('article_id', $comment->article_id)
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

        return $comments;
    }

    public function reply(Request $request) {
        $comment = Comment::findOrFail($request->comment_id);

        $comment->replies()->attach($request->reply_id);

        $comments = Comment::where('article_id', $request->article_id)
                    ->where('parent_id', null)
                    ->orderBy('updated_at', 'desc')
                    ->paginate(8);

        $comments->getCollection()->transform(function ($value) {
            // Your code here
            $value->children = $value->replies()->orderBy('updated_at')->get();
            
            return $value;
        });

        return $comments;
    }
}
