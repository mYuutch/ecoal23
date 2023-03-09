<?php

namespace App\Http\TagsController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use  App\Models\User;
use App\Models\Tag;
use App\Models\Article;

class TagsController extends Controller
{

     public function getTags(){
        return Tag::all();
     }

     public function getArticleTags($id){
        $a = Article::findOrFail($id);
        return $a->tags;
     }

     public function createTag(Request $request){
        Tag::create(["name" => $request->input('name')]);
     }

     public function linkTag($article_id, $tag_id){
        $article = Article::findOrFail($article_id);
        $tag = Tag::findOrFail($tag_id);
        $article->tags()->attach([$tag->id]);
     }

     public function unlinkTag($article_id, $tag_id){
        $article = Article::findOrFail($article_id);
        $tag = Tag::findOrFail($tag_id);
        $article->tags()->detach([$tag->id]);
     }

}
