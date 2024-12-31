<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Response;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sortField = $request->input('sort', 'emp_no');
        $sortOrder = $request->input('order', 'asc');

        $query = $request->input('search');
        $employees = DB::table('employees')
        ->where('first_name', 'like', '%' . $query . '%')
        ->orWhere('last_name', 'like', '%' . $query . '%')
        ->orderBy($sortField, $sortOrder)
        ->paginate(10);

        // $data = json_decode(json_encode($employees), true);
        // Log::info($data);

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'query' => $query,
            'sortField' => $sortField,
            'sortOrder' => $sortOrder
        ]);
    }

    // public function index(Request $request)
    // {
    //     $query = $request->input('search');
    //     $sortField = $request->input('sort', 'emp_no');
    //     $sortOrder = $request->input('order', 'asc');

    //     $employees = DB::table('employees')
    //         ->where('first_name', 'like', '%' . $query . '%')
    //         ->orWhere('last_name', 'like', '%' . $query . '%')
    //         ->orderBy($sortField, $sortOrder)
    //         ->paginate(10);

    //     return Inertia::render('Employees/Index', [
    //         'employees' => $employees,
    //         'query' => $request->query()
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        //
    }
}
