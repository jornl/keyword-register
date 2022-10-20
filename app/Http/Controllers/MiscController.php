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
        $departments = Department::with('user')->latest('updated_at')->get();

        return Inertia::render('Home', [
            'users' => User::latest()->take(5)->get(),
            'departments' => [
                'latest' => $departments->take(5),
                'all' => $departments
            ],
            'keywords' => Keyword::with(['department', 'user'])->latest()->paginate(15),
        ]);
    }
}
