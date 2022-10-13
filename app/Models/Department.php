<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function keywords()
    {
        return $this->hasMany(Keyword::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
