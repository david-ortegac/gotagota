<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        //validación de los datos
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed|min:8',
        ];
        $validator = \Validator::make($request->input(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()->all(),
            ], 400);
        }
        //alta del usuario
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();
        
        $token = $user->createToken('token')->plainTextToken;
        return response()->json([
            'Data'=>$user, 
            'access_token'=>$token,
            'token_type'=>'Bearer',
            'status'=>Response::HTTP_CREATED
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('token')->plainTextToken;
            $cookie = cookie('cookie_token', $token, 60 * 24);
            return response()->json([
                "status"=>true,
                "data"=>$user,
                "token" => $token,
                ], Response::HTTP_OK)->withoutCookie($cookie);
        } else {
            return response(["message" => "Credenciales inválidas"], Response::HTTP_UNAUTHORIZED);
        }
    }

    public function userProfile()
    {
        return response()->json([
            "message" => "userProfile OK",
            "userData" => auth()->user(),
        ], Response::HTTP_OK);
    }

    public function logout()
    {
        $cookie = Cookie::forget('cookie_token');
        auth()->user()->tokens()->delete();
        return response(["message" => "Cierre de sesión OK"], Response::HTTP_OK)->withCookie($cookie);
    }

    public function allUsers()
    {
        $users = User::all();
        return response()->json([
            "users" => $users,
        ]);
    }
}