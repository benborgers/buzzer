<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/play/{game}', Controllers\Views\Play::class);

Route::post('/games/{game}/guess', Controllers\CreateAnswer::class)
    ->name('answers.create');

require __DIR__.'/auth.php';
