<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class CreateAnswer extends Controller
{
    public function __invoke(Request $request, Game $game)
    {
        $body = $request->validate([
            'title' => 'required|string|max:255',
            'user_name' => 'required|string|max:255',
            'team_name' => 'required|string|max:255',
        ]);

        $correct = $game->currentQuestion->guess($body);

        return response()->json([
            'is_correct' => $correct,
        ]);
    }
}
