<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        /**
         * The function that sends an email verification mail to the user upon registration.
         * 
         * We're overriding the default toMailUsing function here, as the passed $url parameter
         * contains the laravel app url as the base url, which we don't want, as the links that are
         * included in the mail should point to our frontend app, which has a different URL.
         */
        VerifyEmail::toMailUsing(function ($notifiable, $url) {
            $slug = substr($url, strpos($url, "/email"));
            $new_url = "http://" . env("SANCTUM_STATEFUL_DOMAINS") . "/user" . $slug;
            return (new MailMessage)
                ->subject('Verify Email Address')
                ->line('Click the button below to verify your email address.')
                ->action('Verify Email Address', $new_url);
        });
    }
}