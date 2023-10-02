<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


/**
 * Class Employee
 *
 * @property $id
 * @property $route_id
 * @property $name
 * @property $last_name
 * @property $phone
 * @property $photo
 * @property $created_by
 * @property $modified_by
 * @property $created_at
 * @property $updated_at
 *
 * @property Route $route
 * @property SpreadSheet[] $spreadSheets
 * @property User $user
 * @property User $user
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Employee extends Model
{
    use HasFactory;

    static $rules = [
		'route_id' => 'required',
		'name' => 'required',
		'last_name' => 'required',
		'created_by' => 'required',
		'modified_by' => 'required',
    ];

    protected $perPage = 20;

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = ['route_id','name','last_name','phone','photo','created_by','modified_by'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function route()
    {
        return $this->hasOne('App\Models\Route', 'id', 'route_id');
    }
    
    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function spreadSheets()
    {
        return $this->hasMany('App\Models\SpreadSheet', 'employee_id', 'id');
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