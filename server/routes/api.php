<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Article;
use App\Models\Tag;


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

//Get all articles
Route::get('/articles', function () {
    return App\Models\Article::all();
});

// Create an article
Route::post('/article', function(Request $request) {
    
    
    $f = $request->file('thumbnail')->hashName();
    $request->file('thumbnail')->move("upload", $f);

    $article = Article::create([
        "title" => $request->input('title'),
        "content" => $request->input('content'),
        "thumbnailURL" => 'upload/'.$f,
        "mediaType" => $request->input('mediaType'),
        "mediaURL" => $request->input('mediaURL'),
        "leadStory" => $request->input('leadStory')
    ]);

    return response($article, 201);
});

//Get a specific article
Route::get('/article/{id}', function($id){
    return App\Models\Article::findOrFail($id);
});


//Get only articles that are lead story
Route::get('/articles/lead/', function (){
    return App\Models\Article::where('leadStory', true)->get();
});


//Get only articles that are not lead story
Route::get('/articles/notLead', function (){
    return App\Models\Article::where('leadStory', false)->get();
});

//Delete a specific article
Route::delete('/article/{id}', function($id){
    $article = App\Models\Article::find($id);

    if ($article == false) {
        return response("", 204);
    }

    $article->delete();
    return response("", 202);
});


//Get an article by Title
Route::get('/article/title/{title}', function($title){
    return Article::where('title',$title)->get();
});

//Get articles with a specific tag
Route::get('/articles/tag/{id}', function($id){
 $tag = Tag::findOrFail($id);
 return $tag->articles;
});

//Get all Tags
Route::get('/tags', function(){
    return Tag::all();
});

// Get Tags of an article
Route::get('/article/{id}/tags', function($id){
    $a = Article::findOrFail($id);
    return $a->tags;
});

//Create a tag 

//Link a tag to an article

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    Route::get('/logout',  [AuthController::class, 'logout']);

    Route::get('/user',  function (Request $request) {
                                return $request->user();
                         });

    Route::put('/updateUsername', [AuthController::class, 'updateUsername']);
    
});



