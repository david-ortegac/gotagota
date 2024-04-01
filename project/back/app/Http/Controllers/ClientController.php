<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class ClientController
 * @package App\Http\Controllers
 */
class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $clients = Client::paginate();

        foreach ($clients as $client) {
            $client->created_by = $client->createdBy;
            $client->modified_by = $client->modifiedBy;
            $client->route = $client->route->number;
        }

        return response()->json($clients, Response::HTTP_OK);

    }

    public function getAll(): JsonResponse
    {
        $clients = Client::all();

        foreach ($clients as $client) {
            $client->created_by = $client->createdBy;
            $client->modified_by = $client->modifiedBy;
            $client->route = $client->route->number;
        }

        return response()->json($clients, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(StoreClientRequest $request): JsonResponse
    {
        $client = new Client();
        $client->route_id = $request->route_id;
        $client->name = $request->name;
        $client->last_name = $request->last_name;
        $client->phone = $request->phone;
        $client->neighborhood = $request->neighborhood;
        $client->address = $request->address;
        $client->city = $request->city;
        $client->profession = $request->profession;
        $client->notes = $request->notes;
        $client->type = $request->type;
        $client->created_by = Auth()->User()->id;
        $client->modified_by = Auth()->User()->id;

        $client->save();

        $client->route = $client->route;
        $client->name = $client->name;
        $client->last_name = $client->last_name;
        $client->phone = $client->phone;
        $client->neighborhood = $client->neighborhood;
        $client->address = $client->address;
        $client->city = $client->city;
        $client->profession = $client->profession;
        $client->notes = $client->notes;
        $client->type = $client->type;
        $client->created_by = $client->createdBy;
        $client->modified_by = $client->modifiedBy;

        return response()->json([
            'status' => "Cliente creado con exito",
            'data' => $client
        ],Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show($id)
    {
        $client = Client::find($id);

        if (isset($client)) {
            $client->created_by = $client->createdBy;
            $client->modified_by = $client->modifiedBy;
            $client->route = $client->route;
            return response()->json([
                $client, Response::HTTP_OK
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
     * @param Client $client
     * @return JsonResponse
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->route_id = $request->route_id;
        $client->name = $request->name;
        $client->last_name = $request->last_name;
        $client->phone = $request->phone;
        $client->neighborhood = $request->neighborhood;
        $client->address = $request->address;
        $client->city = $request->city;
        $client->profession = $request->profession;
        $client->notes = $request->notes;
        $client->type = $request->type;
        $client->modified_by = Auth()->User()->id;

        $client->save();

        $client->route = $client->route;
        $client->name = $client->name;
        $client->last_name = $client->last_name;
        $client->phone = $client->phone;
        $client->neighborhood = $client->neighborhood;
        $client->address = $client->address;
        $client->city = $client->city;
        $client->profession = $client->profession;
        $client->notes = $client->notes;
        $client->type = $client->type;
        $client->created_by = $client->createdBy;
        $client->modified_by = $client->modifiedBy;

        return response()->json([
            'status' => "Cliente actualizado con exito",
            'data' => $client,
        ], Response::HTTP_OK);

    }

    public function searchByDocument($document){
        $client = Client::where('document_number', $document);

        if (isset($client)) {
            $client->created_by = $client->createdBy;
            $client->modified_by = $client->modifiedBy;
            $client->route = $client->route;
            return response()->json([
                $client, Response::HTTP_OK
            ]);
        } else {
            return response()->json([
                'status' => Response::HTTP_BAD_REQUEST,
                'error' => 'Número de documento no encontrado',
            ]);
        }
    }
}
