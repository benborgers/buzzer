<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response('Buzzer')
        ->header('Content-Type', 'text/plain');
})->name('dashboard');

Route::get('/play/{game}', Controllers\Views\Play::class);

Route::post('/games/{game}/guess', Controllers\CreateAnswer::class)
    ->name('answers.create');

Route::middleware('auth')->middleware('can:admin')->group(function () {
    Route::get('/games/{game}', Controllers\RedirectToGame::class);
    Route::get('/questions/{question}', Controllers\Views\QuestionDashboard::class)
        ->name('questions.show');
});

require __DIR__.'/auth.php';
