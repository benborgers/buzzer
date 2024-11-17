<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $casts = [
        'correct_answers' => 'array',
    ];

    public function guess($body)
    {
        $title = $body['title'];
        $user_name = $body['user_name'];
        $team_name = $body['team_name'];

        $isCorrect = false;

        foreach ($this->correct_answers as $correctAnswer) {
            $correctAnswer = str($correctAnswer)->lower()->trim();
            $normalizedTitle = str($title)->lower()->trim();

            if ($normalizedTitle->is($correctAnswer)) {
                $isCorrect = true;
            }
        }

        $this->answers()->firstOrCreate([
            'title' => $title,
            'user_name' => $user_name,
            'team_name' => $team_name,
        ], [
            'is_correct' => $isCorrect,
        ]);

        return $isCorrect;
    }

    public function scopeInOrder($query)
    {
        return $query->orderBy('order');
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function wins()
    {
        return $this->hasMany(Win::class);
    }

    public function firstWin()
    {
        return $this->wins()->oldest()->first();
    }
}
