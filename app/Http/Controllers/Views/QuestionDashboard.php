<?php

namespace App\Http\Controllers\Views;

use App\Http\Controllers\Controller;
use App\Models\Question;
use Inertia\Inertia;

class QuestionDashboard extends Controller
{
    public function __invoke(Question $question)
    {
        $game = $question->game;

        $game->update(['current_question_id' => $question->id]);

        $questions = $game->questions()->inOrder()->get();

        $index = $questions->search(fn ($q) => $q->id === $question->id);
        $total_questions = $questions->count();
        $next_question_id = $questions->get($index + 1)?->id;

        $incorrect_answers = $question->answers()->where('is_correct', false)->latest()->limit(50)->get();

        $team_to_correct_answer_count = $question->answers()->where('is_correct', true)->groupBy('team_name')->selectRaw('team_name, COUNT(*) as count')->get()->keyBy('team_name')->map(fn ($row) => (int) $row->count);

        $first_win_team_name = $question->firstWin()?->team_name;

        $correct_answer = $question->answers()->firstWhere('is_correct', true)?->title;

        return Inertia::render('question-dashboard', compact(
            'index',
            'total_questions',
            'next_question_id',
            'incorrect_answers',
            'team_to_correct_answer_count',
            'first_win_team_name',
            'correct_answer',
        ));
    }
}
