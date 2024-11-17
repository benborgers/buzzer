<?php

use App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::get('/play/{game}', Controllers\Views\Play::class);

require __DIR__.'/auth.php';
