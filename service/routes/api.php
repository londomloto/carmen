<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

/**
 * CLIENT SITE
 */
Route::get('site/status', 'SiteController@status');

/**
 * USERS
 */

/**
 * PRODUCTS
 */
Route::post('products/upload', 'ProductController@upload');
Route::resource('products', 'ProductController');
