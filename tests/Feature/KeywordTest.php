<?php

namespace Tests\Feature;

use App\Models\Department;
use App\Models\Keyword;
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
    public function a_department_can_have_multiple_keywords()
    {
        $department = Department::factory()->create();

        $department->keywords()->create(['keyword' => 'Test Word']);
        $department->keywords()->create(['keyword' => 'Test Word2']);

        $this->assertCount(2, $department->keywords);
    }
}
