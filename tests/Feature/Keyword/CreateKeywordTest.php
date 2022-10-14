<?php

namespace Tests\Feature\Keyword;

use App\Models\Keyword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateKeywordTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_may_not_create_keywords()
    {
        $this->get(route('keywords.create'))
            ->assertRedirect('login');

        $this->post(route('keywords.store', []))
            ->assertRedirect('login');
    }

    /** @test */
    public function authenticated_users_may_create_keywords()
    {
        $this->signIn();

        // $keyword = Keyword::factory()->make(['keyword' => 'oljetank']);

        // $response = $this->withoutExceptionHandling()->get(route('keywords.create'))
        //     ->assertStatus(200)
        //     ->assertSee('Opprett nytt stikkord');


        // $this->followingRedirects()
        //     ->post(route('keywords.store', $keyword))
        //     ->assertStatus(200)
        //     ->assertSee('oljetank');
    }
}
