<?php

namespace App\Http\Controllers\Views;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class Play extends Controller
{
    public function __invoke()
    {
        return Inertia::render('play');
    }
}
