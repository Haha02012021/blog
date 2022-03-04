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
        $names = [];

        if($request->hasFile('image'))
        {
            foreach($request->file('image') as $image)
            {
                $imageName = time().rand(1, 1000).'.'.$image->getClientOriginalExtension();

                $image->move(public_path('images/'), $imageName);
                
                Image::create([
                    'name' => $imageName,
                    'imageable_id' => $request->imageable_id,
                    'imageable_type' => 'App\\Models\\'.$request->imageable_type,
                    'role' => $request->role
                ]);

                array_push($names, $imageName);
            }
        }

        $imgPaths = [];

        foreach($names as $name) {
            array_push($imgPaths, asset('images/'.$name));
        }

        return $imgPaths;
    
    }
}
