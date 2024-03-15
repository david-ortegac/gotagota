<?php

namespace App\Http\Controllers;

use App\Models\Sede;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class SedeController
 * @package App\Http\Controllers
 */
class SedeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $sedes = Sede::paginate();

        foreach ($sedes as $sede) {
            $sede->created_by = $sede->createdBy;
            $sede->modified_by = $sede->modifiedBy;

        }

        if ($sedes->count() > 0) {
            return response()->json($sedes, Response::HTTP_OK);
        } else {
            return response()->json($sedes, Response::HTTP_NOT_FOUND);
        }
    }

    public function getAll()
    {
        $sedes = Sede::all();

        return response()->json(
            $sedes,Response::HTTP_OK,
        );

    }

    public function show($id)
    {
        $sede = Sede::findOrFail($id);
        if (isset($sede)) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'data' => $sede
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'error' => 'No existen registros para retornar',
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validated = request()->validate(Sede::$rules);

        $sede = new Sede;
        $sede->name = $request->name;
        $sede->created_by = Auth()->User()->id;
        $sede->modified_by = Auth()->User()->id;

        $sede->save();

        if ($validated) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'data' => $sede
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
     * @param Sede $sede
     * @return JsonResponse
     */
    public function update(Request $request, Sede $sede)
    {
        $validated = request()->validate(Sede::$rules);

        $sede = Sede::findOrFail($request->id);
        $sede->name = $request->name;
        $sede->modified_by = Auth()->User()->id;

        $sede->update();

        if ($validated) {
            return response()->json([
                'status' => Response::HTTP_OK,
                'data' => $sede
            ]);
        } else {
            return response()->json("error", 404);
        }

    }
}
