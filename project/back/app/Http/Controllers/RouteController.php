<?php

namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;

/**
 * Class RouteController
 * @package App\Http\Controllers
 */
class RouteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $routes = Route::paginate();

        return view('route.index', compact('routes'))
            ->with('i', (request()->input('page', 1) - 1) * $routes->perPage());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $route = new Route();
        return view('route.create', compact('route'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate(Route::$rules);

        $route = Route::create($request->all());

        return redirect()->route('routes.index')
            ->with('success', 'Route created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $route = Route::find($id);

        return view('route.show', compact('route'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $route = Route::find($id);

        return view('route.edit', compact('route'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Route $route
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Route $route)
    {
        request()->validate(Route::$rules);

        $route->update($request->all());

        return redirect()->route('routes.index')
            ->with('success', 'Route updated successfully');
    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $route = Route::find($id)->delete();

        return redirect()->route('routes.index')
            ->with('success', 'Route deleted successfully');
    }
}
