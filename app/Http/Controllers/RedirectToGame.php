<?php

namespace App\Http\Controllers;

use App\Models\Game;

class RedirectToGame extends Controller
{
    public function __invoke(Game $game)
    {
        return redirect()->route('questions.show', $game->currentQuestion);
    }
}
