<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    public function currentQuestion()
    {
        return $this->hasOne(Question::class, 'id', 'current_question_id');
    }
}
