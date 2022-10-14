<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Keyword;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class KeywordTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_belongs_to_an_department()
    {
        $keyword = Keyword::factory()->create();
        $this->assertNotEmpty($keyword->department);
    }

    /** @test */
    public function it_belongs_to_a_user()
    {
        $keyword = Keyword::factory()->create();
        $this->assertNotEmpty($keyword->user);
    }

    /** @test */
    public function a_department_can_have_multiple_keywords()
    {
        $department = Department::factory()->create();
        $user = User::factory()->create();

        $department->keywords()->create(['keyword' => 'Test Word', 'user_id' => $user->id]);
        $department->keywords()->create(['keyword' => 'Test Word2', 'user_id' => $user->id]);

        $this->assertCount(2, $department->keywords);
    }
}
