<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Keyword;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KeywordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Welcome', [
            'keywords' => Keyword::with('department')->latest()->paginate(16)
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
        Auth::user()->keywords()->create($request->validate([
            'keyword' => 'required|unique:keywords',
            'department_id' => 'required',
            'additional_info' => 'nullable|string'
        ]));

        return redirect(route('dashboard'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Keyword  $keyword
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Keyword $keyword)
    {
        $keyword->update($request->validate([
            'keyword' => 'required',
            'department_id' => 'sometimes|required',
            'additional_info' => 'nullable|string'
        ]));

        return redirect(route('dashboard'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Keyword  $keyword
     * @return \Illuminate\Http\Response
     */
    public function destroy(Keyword $keyword)
    {
        $keyword->delete();

        return redirect(route('dashboard'));
    }
}
