<?php

namespace Tests\Feature\Keyword;

use App\Models\Keyword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Inertia\Testing\AssertableInertia as Assert;

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
    public function authenticated_users_gets_an_error_when_fields_are_missing()
    {
        $this->signIn();

        $this
            ->get(route('dashboard'))
            ->assertOk();

        $this
            ->followingRedirects()
            ->post(route('keywords.store'))
            ->assertOk()
            ->assertInertia(
                fn (Assert $page) => $page
                    ->component('Home')
                    ->where('errors.keyword', 'The keyword field is required.')
                    ->where('errors.department_id', 'The department id field is required.')
            );
    }

    /** @test */
    public function authenticated_users_can_create_a_keyword()
    {
        $user = $this->signIn();
        $keyword = Keyword::factory()->make([
            'user_id' => $user->id
        ])->toArray();

        $this
            ->get(route('dashboard'))
            ->assertOk();

        $this
            ->followingRedirects()
            ->post(route('keywords.store'), $keyword)
            ->assertOk()
            ->assertInertia(
                function (Assert $page) use ($keyword) {
                    $page
                        ->component('Home')
                        ->where('errors', [])
                        ->where('keywords.data.0.keyword', $keyword['keyword']);
                }
            );

        $this->assertDatabaseHas('keywords', $keyword);
    }
}
