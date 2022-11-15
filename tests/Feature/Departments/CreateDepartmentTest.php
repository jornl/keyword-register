<?php

namespace Tests\Feature\Departments;

use App\Models\Department;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class CreateDepartmentTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guests_may_not_create_departments()
    {
        $this
            ->get(route('dashboard'))
            ->assertRedirect(route('login'));

        $this
            ->post(route('departments.store'), [])
            ->assertRedirect(route('login'));
    }

    /** @test */
    public function authenticated_users_gets_an_error_when_required_fields_are_missing()
    {
        $this->signIn();

        $this->get(route('dashboard'));

        $this
            ->followingRedirects()
            ->post(route('departments.store'), [])
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Home')
                    ->where('errors.name', "The name field is required.")
            );
    }

    /** @test */
    public function authenticated_users_may_create_departments()
    {
        $this->signIn();

        $department = Department::factory()->make(['name' => 'Department of Keywords']);

        $this->get(route('dashboard'));

        $this
            ->followingRedirects()
            ->post(route('departments.store'), $department->toArray())
            ->assertOk()
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('Home')
                    ->where('errors', [])
                    ->where('departments.latest.0.name', $department->name)
            );

        $this->assertDatabaseHas('departments', ['name' => $department->name]);
    }
}
