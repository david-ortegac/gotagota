<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Http\Requests\StoreLoansRequest;
use App\Http\Requests\UpdateLoansRequest;
use Symfony\Component\HttpFoundation\Response;

class LoansController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $loans = Loan::paginate();

        return response()->json($loans, Response::HTTP_OK);
    }

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
    public function store(StoreLoansRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(int $routeId)
    {
        $loans = Loan::where('route_id', $routeId)->get();

        if (isset($loans)) {
            foreach ($loans as $loan) {
                $loan->route = $loan->route;
                $loan->client = $loan->client;
                $loan->created_by = $loan->createdBy;
                $loan->modified_by = $loan->modifiedBy;
            }
            return response()->json(

                $loans, Response::HTTP_OK
            );
        } else {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'error' => 'No existen registros para retornar',
            ]);
        }

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Loans $loans)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLoansRequest $request, Loans $loans)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loans $loans)
    {
        //
    }
}
