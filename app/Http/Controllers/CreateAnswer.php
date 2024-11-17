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

        $question = $game->currentQuestion;

        $correct = $question->guess($body);

        $correctAnswersCountForTeam = $question->answers()
            ->where('is_correct', true)
            ->where('team_name', $body['team_name'])
            ->count();

        if ($correctAnswersCountForTeam === CORRECT_ANSWERS_TO_WIN) {
            $question->wins()->create([
                'team_name' => $body['team_name'],
            ]);
        }

        return response()->json([
            'is_correct' => $correct,
        ]);
    }
}
