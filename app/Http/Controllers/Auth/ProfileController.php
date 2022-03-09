<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function edit() {
        return Inertia::render('User/Pages/Edit');
    }

    public function update(Request $request, $id) {
        $user = User::find($id);

        $request->validate([
            'gender' => 'string',
            'birthday' => 'date'
        ]);

        //print_r($request);

        $user->gender = $request->gender;
        $user->birthday = $request->birthday;

        $user->update();

        return redirect()->back();
    }
}
