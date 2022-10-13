<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Keyword;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MiscController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'users' => User::latest()->take(5)->get(),
            'departments' => Department::with('user')->latest()->take(5)->get(),
            'keywords' => Keyword::with(['department', 'user'])->latest()->paginate(15),
        ]);
    }
}
