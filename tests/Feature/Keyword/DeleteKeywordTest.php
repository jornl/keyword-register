<?php

namespace Tests\Feature\Keyword;

use App\Models\Keyword;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteKeywordTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guests_may_not_delete_keywords()
    {
        $this
            ->delete(route('keywords.destroy', 1))
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function authenticated_users_can_delete_keywords()
    {
        $this->signIn();

        $keyword = Keyword::factory()->create();

        $this
            ->assertDatabaseCount('keywords', 1)
            ->delete(route('keywords.destroy', $keyword->id));

        $this
            ->assertDatabaseCount('keywords', 0)
            ->assertDatabaseMissing('keywords', $keyword->toArray());
    }
}
