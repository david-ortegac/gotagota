<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
			'route_id' => 'required',
			'client_id' => 'required',
			'amount' => 'required',
			'paymentDays' => 'required|string',
			'paymentType' => 'required|string',
			'deposit' => 'required',
			'lastInstallment' => 'required',
			'remainingBalance' => 'required',
			'remainingAmount' => 'required',
			'daysPastDue' => 'required',
			'lastPayment' => 'required',
			'startDate' => 'required',
			'finalDate' => 'required',
			'created_by' => 'required',
			'modified_by' => 'required',
        ];
    }
}
