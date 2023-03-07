<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('/articles', function () {
    return App\Models\Article::all();
});

Route::get('/article/{id}', function($id){
    return App\Models\Article::find($id);
});

Route::delete('/article/{id}', function($id){
    $article = App\Models\Article::find($id);

    if ($article == false) {
        return response("", 204);
    }

    $article->delete();
    return response("", 202);
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    Route::get('/logout',  [AuthController::class, 'logout']);

    Route::get('/user',  function (Request $request) {
                                return $request->user();
                         });
    
});



