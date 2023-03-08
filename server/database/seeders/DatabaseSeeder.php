<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Article;
use App\Models\Tag;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $article1 =  Article::create([
            'title' => 'Welcome to ecoal23',
            'content' => '<h1>Hello from ecoal</h1><p>Nice to see you in <strong>Lens</strong>. Enjoy !</p>',
            'thumbnailURL' => '/ecoal.jpg',
            'mediaType' => 'image',
            'mediaURL' => '/ecoal.jpg',
            'leadStory' => true    
        ]);

        $article2 =  Article::create([
            'title' => 'Welcome to ecoal23',
            'content' => '<h1>Hello from ecoal</h1><p>Nice to see you in <strong>Lens</strong>. Enjoy !</p>',
            'thumbnailURL' => '/ecoal.jpg',
            'mediaType' => 'image',
            'mediaURL' => '/ecoal.jpg',
            'leadStory' => true    
        ]);

        $article3 =  Article::create([
            'title' => 'Welcome to ecoal23',
            'content' => '<h1>Hello from ecoal</h1><p>Nice to see you in <strong>Lens</strong>. Enjoy !</p>',
            'thumbnailURL' => '/ecoal.jpg',
            'mediaType' => 'image',
            'mediaURL' => '/ecoal.jpg',
            'leadStory' => true    
        ]);

        
     
        $tag1 = Tag::create(['name' => 'ecoal23']);
        $tag2 = Tag::create(['name' => 'react']);

        $article1->tags()->attach([$tag1->id, $tag2->id]);
        $article2->tags()->attach([$tag1->id, $tag2->id]);
        $article3->tags()->attach([$tag1->id, $tag2->id]);
       
    }
}
