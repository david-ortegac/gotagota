<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRouteRequest;
use App\Http\Requests\UpdateRouteRequest;
use App\Models\Route;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class RouteController
 * @package App\Http\Controllers
 */
class RouteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $routes = Route::paginate();

    foreach ($routes as $route) {
        $route->sede = $route->sede;
        unset($route->sede_id);
        $route->created_by = $route->createdBy;
        $route->modified_by = $route->modifiedBy;
    }

        return response()->json($routes, Response::HTTP_OK);

    }

    /*
     * Obtiene la informacion de todas las rutas sin paginación
     * No recibe parametros
     * */
    public function getAll(): JsonResponse
    {
        $routes = Route::all();
        foreach ($routes as $route) {
            $route->created_by = $route->createdBy;
            $route->modified_by = $route->modifiedBy;
            $route->sede = $route->sede;
            unset($route->sede_id);
        }
        return response()->json(
            $routes, Response::HTTP_OK,
        );

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(StoreRouteRequest $request): JsonResponse
    {
        $route = new Route();
        $route->sede_id = $request->sede_id;
        $route->number = $request->number;
        $route->created_by = Auth()->User()->id;
        $route->modified_by = Auth()->User()->id;

        $route->save();

        $route->sede_id = $route->sede;
        $route->number = $route->number;
        $route->created_by = $route->createdBy;
        $route->modified_by = $route->modifiedBy;

        $route->sede = $route->sede->name;
        return response()->json([
            'status' => "Sede guardada exitosamente",
            'data' => $route
        ], Response::HTTP_CREATED);

    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $route = Route::findOrFail($id);

        if (isset($route)) {
            $route->sede = $route->sede;
            unset($route->sede_id);
            return response()->json([
                'status' => Response::HTTP_OK,
                'data' => $route
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'error' => 'No existen registros para retornar',
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Route $route
     * @return JsonResponse
     */
    public function update(UpdateRouteRequest $request, Route $route): JsonResponse
    {
        $route->sede_id = $request->sede_id;
        $route->number = $request->number;
        $route->modified_by = Auth()->User()->id;

        $route->update();

        $route->sede = $route->sede;

        return response()->json([
            'status' => "Ruta actualizada exitosamente",
            'data' => $route
        ], Response::HTTP_OK);

    }

}
