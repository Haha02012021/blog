<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function upload(Request $request) {
        $request->validate([
            'imageable_id' => 'required|integer',
            'imageable_type' => 'required|string',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048'
        ]);
        
        $imageName = time().'.'.$request->image->getClientOriginalExtension();

        $request->image->move(public_path('images/'), $imageName);

        Image::create([
            'name' => $imageName,
            'imageable_id' => $request->imageable_id,
            'imageable_type' => 'App\\Models\\'.$request->imageable_type
        ]);

        return $imageName;
    }

    public function loadMany(Request $request) {

        return Image::where('imageable_type', 'Auth\\Models\\'.$request->type)->get();
    }
}
