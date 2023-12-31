<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Client
 *
 * @property $id
 * @property $route_id
 * @property $name
 * @property $last_name
 * @property $email
 * @property $phone
 * @property $neighborhood
 * @property $address
 * @property $city
 * @property $profession
 * @property $notes
 * @property $type
 * @property $created_by
 * @property $modified_by
 * @property $created_at
 * @property $updated_at
 *
 * @property Loan[] $loans
 * @property Route $route
 * @property User $user
 * @property User $user
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Client extends Model
{
    use HasFactory;

    static $rules = [
        'route_id' => 'required',
        'name' => 'required',
        'last_name' => 'required',
        'phone' => 'required',
        'neighborhood' => 'required',
        'address' => 'required',
        'city' => 'required',
        'profession' => 'required',
        'notes' => 'required',
        'type' => 'required',
        'created_by' => 'required',
        'modified_by' => 'required',
    ];

    protected $perPage = 20;

    protected $hidden = [
        'created_by',
        'modified_by',
        'route_id',
    ];

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'route_id',
        'name',
        'last_name',
        'email',
        'phone',
        'neighborhood',
        'address',
        'city',
        'profession',
        'notes',
        'type',
        'created_by',
        'modified_by',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function loans()
    {
        return $this->hasMany('App\Models\Loan', 'client_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function route()
    {
        return $this->hasOne('App\Models\Route', 'id', 'route_id')
        ->select(array('number'));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function createdBy()
    {
        return $this->hasOne('App\Models\User', 'id', 'created_by')
        ->select(array('name','email'));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function modifiedBy()
    {
        return $this->hasOne('App\Models\User', 'id', 'modified_by')
        ->select(array('name','email'));
    }

}