<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;

    protected $table = 'routes';

    protected $filable=[
        'sede_id',
        'number'
    ];

    public function employees(): HasMany{
        return $this->hasMany(Employee::class);
    }

    public function clients(): HasMany{
        return $this->hasMany(Client::class);
    }

    public function loans(): HasMany{
        return $this->hasMany(Loan::class);
    }
}