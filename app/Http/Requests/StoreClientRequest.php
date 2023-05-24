<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'tel' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email|max:255',
            'last_contacted' => 'required|date_format:Y-m-d H:i:s',
        ];
    }
}