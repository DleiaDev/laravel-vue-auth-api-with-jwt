<?php

use Illuminate\Http\Request;

Route::group(['prefix' => 'auth'], function ($router) {
  Route::post('register', 'API\AuthController@register');
  Route::post('login', 'API\AuthController@login');
  Route::post('logout', 'API\AuthController@logout');
  Route::post('refresh', 'API\AuthController@refresh');
  Route::post('me', 'API\AuthController@me');
});

Route::get('test', function() {
  return 'Testing....';
})->middleware('auth:api');
