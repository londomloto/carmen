<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SiteController extends Controller
{
    public function status() {
        
        $data = [
            'title' => 'Carmen Store'
        ];

        return response()->json($data);
    }
}
