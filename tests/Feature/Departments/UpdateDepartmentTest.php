<?php

namespace Tests\Feature\Departments;

use App\Models\Department;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class UpdateDepartmentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guests_may_not_update_departments()
    {
        $this
            ->patch(route('departments.update', 1), [])
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function authenticated_users_gets_an_error_when_update_fields_are_missing()
    {
        $this->signIn();

        $this->get(route('dashboard'));

        $department = Department::factory()->create();

        $this
            ->followingRedirects()
            ->patch(route('departments.update', $department->id), ['name' => ''])
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Home')
                    ->where('errors.name', 'The name field is required.')
            );

        $this->assertDatabaseHas('departments', ['name' => $department->name]);
    }

    /** @test */
    public function authenticated_users_may_update_departments()
    {
        $this->signIn();

        $department = Department::factory()->create();

        $this->get(route('dashboard'));

        $this
            ->followingRedirects()
            ->patch(route('departments.update', $department->id), ['name' => 'New Department Name'])
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Home')
                    ->where('errors', [])
                    ->where('departments.latest.0.name', 'New Department Name')
            );

        $this->assertDatabaseHas('departments', ['name' => 'New Department Name']);
    }
}
