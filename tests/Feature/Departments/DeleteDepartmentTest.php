<?php

namespace Tests\Feature\Departments;

use App\Models\Department;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class DeleteDepartmentTest extends TestCase
{

    use RefreshDatabase;

    /** @test */
    public function guests_may_not_delete_departments()
    {
        $this
            ->delete(route('departments.destroy', 1))
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function authenticated_users_may_delete_departments()
    {
        $this->signIn();

        $department = Department::factory()->create();

        $this
            ->assertDatabaseCount('departments', 1)
            ->delete(route('departments.destroy', $department->id));

        $this
            ->assertDatabaseCount('departments', 0)
            ->assertDatabaseMissing('departments', ['name' => $department->name]);
    }
}
