<?php

namespace Tests\Feature\Keyword;

use App\Models\Keyword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class UpdateKeywordTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guests_may_not_update_keywords()
    {
        $this
            ->patch(route('keywords.update', 1), [])
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function authenticated_users_gets_an_error_when_update_fields_are_missing()
    {
        $this->signIn();

        $keyword = Keyword::factory()->create();

        $this->get(route('dashboard'));

        $this
            ->followingRedirects()
            ->put(route('keywords.update', 1), ['keyword' => '', 'department_id' => ''])
            ->assertOk()
            ->assertInertia(
                fn (Assert $page) => $page
                    ->component('Home')
                    ->where('errors.keyword', 'The keyword field is required.')
                    ->where('errors.department_id', 'The department id field is required.')
            );

        $this->assertDatabaseHas('keywords', ['keyword' => $keyword->keyword, 'department_id' => $keyword->department_id]);
    }

    /** @test */
    public function authenticated_users_can_update_a_keyword()
    {
        $this->signIn();

        $keyword = Keyword::factory()->create();

        $this->get(route('dashboard'));

        $this
            ->followingRedirects()
            ->patch(route('keywords.update', $keyword->id), ['keyword' => 'KeywordRegister'])
            ->assertOk()
            ->assertInertia(
                fn (Assert $page) => $page
                    ->component('Home')
                    ->where('errors', [])
                    ->where('keywords.data.0.keyword', 'KeywordRegister')
            );

        $this->assertDatabaseHas('keywords', ['keyword' => 'KeywordRegister']);
    }
}
