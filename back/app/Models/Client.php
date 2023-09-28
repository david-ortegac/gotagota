<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';

    protected $hidden = [
        'route_id',
        'name',
        'lastName',
        'phone',
        'address',
        'profession',
        'type'
    ];

    public function route(): BelongsTo
    {
        return $this->belongsTo(Route::class);
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }
    
}