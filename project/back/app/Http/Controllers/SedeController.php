<?php

namespace App\Http\Controllers;

use App\Models\Sede;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * Class SedeController
 * @package App\Http\Controllers
 */
class SedeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sedes = Sede::paginate();

        foreach ($sedes as $sede) {
            $sede->created_by = $sede->createdBy;
            $sede->modified_by = $sede->modifiedBy;

        }

        if ($sedes->count() > 0) {
            return response()->json($sedes, 200);
        } else {
            return response()->json($sedes, 404);
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
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
            return response()->json($sede, 201);
        } else {
            return response()->json(error, 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  Sede $sede
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sede $sede)
    {

        return $request;
        $validated = request()->validate(Sede::$rules);

        $sede = Sede::findOrFail($request->id);
        $sede->name = $request->name;
        $sede->modified_by = Auth()->User()->id;

        $sede->update();

        if ($validated) {
            return response()->json($sede, 201);
        } else {
            return response()->json(error, 404);
        }

    }

    /**
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     * @throws \Exception
     */
    public function destroy($id)
    {
        $sede = Sede::find($id)->delete();

        return redirect()->route('sedes.index')
            ->with('success', 'Sede deleted successfully');
    }
}