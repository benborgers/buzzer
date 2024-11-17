<?php

namespace App\Http\Controllers\Views;

use App\Http\Controllers\Controller;
use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Play extends Controller
{
    public function __invoke(Game $game)
    {
        return Inertia::render('play');
    }
}
