<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Notifications\MailResetPasswordMail;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Override the default notification mail when the user resets the password.
     * This is necessary as by default, the mail the user gets would include
     * a reset link that points to the url of the laravel application (e.g. localhost:8000).
     * Since we use an SPA for the frontend, we need a different url (e.g., localhost:3000).
     * This function achieves the desired behaviour.
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new MailResetPasswordMail($token));
    }
}