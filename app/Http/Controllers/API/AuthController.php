<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;

class AuthController extends Controller
{
    // Construct
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'logout']]);
    }

    // Register
    public function register(Request $request)
    {
        $this->validate($request, [
          'name' => 'required',
          'email' => 'required|email|unique:users',
          'password' => 'required|min:6|confirmed',
          'password_confirmation' => 'required'
        ]);

        $user = new User([
          'name' => $request->name,
          'email' => $request->email,
          'password' => bcrypt($request->password)
        ]);
        $user->save();
    }

    // Login
    public function login(Request $request)
    {
        $this->validate($request, [
          'email' => 'required',
          'password' => 'required'
        ]);

        $credentials = request(['email', 'password']);

        if (!$token = auth('api')->attempt($credentials)) {
          return response(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    // Current user
    public function me()
    {
        return response(auth('api')->user());
    }

    // Logout
    public function logout()
    {
        auth('api')->logout();

        return response(['message' => 'Successfully logged out']);
    }

    // Refresh token
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    // Token response
    protected function respondWithToken($token)
    {
        return response([
          'user' => auth('api')->user(),
          'access_token' => $token,
          'token_type' => 'bearer',
          'expires_in' => auth('api')->factory()->getTTL()
        ]);
    }

    // Guard
    public function guard() {
        return Auth::guard('api');
    }
}
