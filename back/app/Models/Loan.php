<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $table = 'loans';

    protected $fillable = [
        'client_id',
        'rotute_id',
        'amount',
        'type'
    ];

    public function clients(): BelongsTo{
        return $this->belongsTo(Client::class);
    }

    public function rotutes(): BelongsTo{
        return $this->belongsTo(Rotute::class);
    }
}