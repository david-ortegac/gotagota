<?php

namespace App\Http\Controllers;

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
            $route->sede_id = $route->sede->name;
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
            $route->sede = $route->sede->name;
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
    public function store(Request $request): JsonResponse
    {
        return $request;
        $validated = request()->validate(Route::$rules);

        if ($validated) {
            $route = new Route();
            $route->sede_id = $request->sede_id;
            $route->number = $request->number;
            $route->created_by = Auth()->User()->id;
            $route->modified_by = Auth()->User()->id;

            $route->save();

            $route->sede = $route->sede->name;
            return response()->json([
                'status' => Response::HTTP_CREATED,
                'data' => $route
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'error' => 'Error al guardar',
            ]);
        }
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
            $route->sede = $route->sede->name;
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
    public function update(Request $request, Route $route): JsonResponse
    {
        $validated = request()->validate(Route::$rules);

        if ($validated) {
            $route = Route::findOrFail($request->id);
            $route->sede_id = null ? $route->sede_id : $request->sede_id;
            $route->number = null ? $route->number : $request->number;
            $route->modified_by = Auth()->User()->id;

            $route->update();

            $route->sede = $route->sede->name;
            return response()->json([
                'status' => Response::HTTP_OK,
                'data' => $route
            ]);
        } else {
            return response()->json("error", 404);
        }
    }

}
