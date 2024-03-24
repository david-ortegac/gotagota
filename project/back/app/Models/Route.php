<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Route
 *
 * @property $id
 * @property $sede_id
 * @property $number
 * @property $created_by
 * @property $modified_by
 * @property $created_at
 * @property $updated_at
 *
 * @property Client[] $clients
 * @property Sede $sede
 * @property User $createdBy
 * @property User $modifiedBy
 * @package App
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
class Route extends Model
{
    use HasFactory;

    static $rules = [
        'sede_id' => 'required',
        'number' => 'required'
    ];

    protected $perPage = 20;

    protected $hidden = [
        'created_by',
        'modified_by',
        'updated_at',
        'created_at',
    ];

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sede_id',
        'number',
        'created_by',
        'modified_by',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function clients()
    {
        return $this->hasMany('App\Models\Client', 'route_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function employees()
    {
        return $this->hasMany('App\Models\Employee', 'route_id', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function sede()
    {
        return $this->hasOne('App\Models\Sede', 'id', 'sede_id')
        ->select(array('id','name'));
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
