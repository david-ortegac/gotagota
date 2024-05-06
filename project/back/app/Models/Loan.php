<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Loan
 *
 * @property $id
 * @property $client_id
 * @property $amount
 * @property $type
 * @property $remainingAmount
 * @property $remainingTime
 * @property $daysPastDue
 * @property $created_by
 * @property $modified_by
 * @property $created_at
 * @property $updated_at
 *
 * @property Client $client
 * @property SpreadSheet[] $spreadSheets
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Loan extends Model
{

    static $rules = [
		'client_id' => 'required',
		'amount' => 'required',
		'type' => 'required',
		'remainingAmount' => 'required',
		'remainingTime' => 'required',
		'daysPastDue' => 'required',
		'created_by' => 'required',
		'modified_by' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'client_id',
        'amount',
        'type',
        'remainingAmount',
        'remainingTime',
        'daysPastDue',
        'created_by',
        'modified_by'
    ];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function client()
    {
        return $this->hasOne('App\Models\Client', 'id', 'client_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function spreadSheets()
    {
        return $this->hasMany('App\Models\SpreadSheet', 'loan_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function created_by()
    {
        return $this->hasOne('App\Models\User', 'id', 'created_by');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function modified_by()
    {
        return $this->hasOne('App\Models\User', 'id', 'modified_by');
    }


}
