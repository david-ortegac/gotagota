<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class SpreadSheet
 *
 * @property $id
 * @property $loan_id
 * @property $employee_id
 * @property $order
 * @property $date
 * @property $pay
 * @property $amount
 * @property $created_at
 * @property $updated_at
 *
 * @property Employee $employee
 * @property Loan $loan
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class SpreadSheet extends Model
{
    
    static $rules = [
		'loan_id' => 'required',
		'employee_id' => 'required',
		'order' => 'required',
		'date' => 'required',
		'pay' => 'required',
		'amount' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['loan_id','employee_id','order','date','pay','amount'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function employee()
    {
        return $this->hasOne('App\Models\Employee', 'id', 'employee_id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function loan()
    {
        return $this->hasOne('App\Models\Loan', 'id', 'loan_id');
    }
    

}
