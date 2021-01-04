# Laravel Next.js Starter Kit

## What’s inside?

Laravel and Next.js are two awesome frameworks to build modern Web-Apps. However, creating a Laravel based API and hooking it up to a Next.js frontend (or any other SPA Frontend) can be a quite tedious task that involves a lot of boilerplate (e.g., authentication).
This repo provides a Starter Kit that hooks up a Laravel 8 API to a Next.js 10 Frontend and includes all the basic features you need, so you can focus on the important and unique parts of your app.
The Kit includes:

-   Hooking up backend and frontend (CORS, settings, default base URLs etc.)
-   Laravel sanctum for authentication api routes on the backend
-   Full authentication functionality on the frontend (Registration, login, email verification, password restoring)
-   Protected frontend routes without page flashing
-   Redux
-   Google Tag Manager support
-   Some default React components that can be re-used across the frontend
-   Tailwind CSS
-   Flexible customisation options via .env files
-   User roles
-   TypeScript support.

## Disclaimer

This Starter Kit leans towards the creation of Server Side Rendered (SSR) dynamic Web-Apps that handle and display dynamic data on the fly. Thus, this Starter Kit is for you if you want users to be able to register and have them be able to create user specific data, dashboards etc. In other words, **this repo is not suited for Server Side Generation (SSG) and use cases where the consumed data is known at build time.** In fact, Server Side Generation is not supported with this Starter Kit, as the `getInitProps()` method is called in `_app.tsx`.

## Getting started

To get things working, we must configure both the backend (Laravel) and the frontend (Next.js) correctly.

### Backend settings

#### Environment variables

Navigate to the root directory. Copy and paste the `.env.example` file and rename it to `.env`

```
cp .env.example .env
```

Now open the `.env` file and fill in the values as needed. You might notice that the file is very similar to the default `.env` file that ships with Laravel, but it’s not 100% the same. Some values are already set or changed (e.g., `SESSION_DRIVER`) and some new ones are added. These configurations are necessary in order to hook the backend up to the frontend.
If you run your frontend on the default URL and Port (http://localhost:3000), you only need to replace the XXXXXXXXXXXXXXXX values. If you do not want to use the Next.js default URL and Port, you also need to adjust the `SANCTUM_STATEFUL_DOMAINS` variable. Please only provide ONE value here. This means NO comma separated URLs.
Notice: The repo uses some email functionality (registration, password reset). If you do not want these features, you must make some small tweaks. However, if you do want to take advantage of these features you MUST configure you email settings correctly. The app will break otherwise. Luckily, Laravel makes this extremely easy. More on that later on.

#### Migrations

If you worked with Laravel before you are probably familiar with `artisan`. In order to prepopulate our database with all the necessary tables, you must execute the following command:

```
php artisan migrate --seed
```

The `--seed` flag is optional but useful, since it creates some users and an admin for you (more on that below).

Once this is done, we can move to the frontend environment settings

### Frontend setup

#### Environment variables

We now take care of settings up our frontend. Therefore, navigate to the `/client` directory, where our Next.js app lives.
First things first, we need to run `npm install` to install all our dependencies.
Next, copy and paste the `.env.local.example` file and rename it to `.env.local`

```
cd client; cp .env.local.example .env.local
```

Next.js can handle the `.env.local` file out of the box and even allows us to access the environment variables in the browser. For more information visit their [environment variables documentation](https://nextjs.org/docs/basic-features/environment-variables). In a nutshell, it tells us that all variables that start with `NEXT_PUBLIC_` will be accessible in the browser, which is great news for us!

`NEXT_PUBLIC_API_HOST_URL` is the URL and host our Laravel API runs on. It defaults to `http://localhost:8000`. Customize it to your requirements.
`NEXT_PUBLIC_USER_HOME_ROUTE` is the home route for authenticated users, as the name indicates. It is the route a user will be redirected to after authentication, for example.
`NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID` is your Google Tag Manager Container ID. If you leave it empty, Google Tag Manager won’t be integrated. However, if you build production ready application, it is highly advised to do so (see more below.)

#### TypeScript

The app is written with TypeScript. If you instead want good old Javascript you must change all file extensions from `.tsx` to `.jsx` or `.js`. You then also have go through all the files and delete TypeScript specific syntax. My advise would be to leave it as it is and just use the `.js` extension in the files you create of top of the Starter Kit, if you don't want to use TypeScript.

#### config.tsx

You might have already noticed that there is a file named `/client/config/config.tsx`, which does not ship with Next.js by default. This file handles some default configurations for us.
We use `axios` to make api requests and make some default configurations that our Laravel backend requires.
Also, we export a variable named `protectedRoutes`. It is an array of routes/slugs that will not be accessible for unauthenticated users. The list also respects sub-routes, which means if we include „/dashboard“, „/dashboard/a“ or „/dashboard/a/b/c“ will be protected as well.
For example:

```javascript
export const protectedRoutes = [
    process.env.NEXT_PUBLIC_USER_HOME_ROUTE, // -> default
    "/profile",
    "/accout",
    // ...
];
```

Customize this file according to your needs.

### Launching the app

Congrats! You are now ready to launch the application.
In order to get backend and frontend running at the same time, you need two terminal windows.
In one, navigate to the root directory of your project and execute

```
php artisan serve
```

In the second terminal, navigate to `/client` and execute

```
npm run dev
```

The two commands ship directly with Laravel and Next.js, respectively.

Now navigate to the frontend URL. You now see the homepage. You may register a new user under `/user/register` or login at `/user/login`. For more info see below.

## Email testing

Multiple parts of this application require proper settings for email. This includes the verification of a newly created users email address as well as the password reset functionality. Configuring email is no absolute must but highly recommended, as some tweaks to the code have to be done otherwise. Plus, these features are quite useful.

To configure your email settings, open the `.env` file at the root of your project. Under the `MAIL_` „section“ you can set any configurations you like. For development, I recommend [MailTrap](https://mailtrap.io/) for a fake smtp testing server. You can set up an account for free and let MailTrap generate the .env variables for you that you can then paste into your `.env` file. All mails you then send from your app will be caught by MailTrap and accessible for you via their dashboard.

## Authentication

### Registration

A new user can be registered under `/user/register`.
The following requirements must be pleased in order for the form to be submittable:

-   Name only contains letters
-   Email is valid and does not include „@email“ or „@example“
-   Password must be at least 8 characters long and may not contain „123456“ or „passwor“.
    You can adjust the requirements under `/client/services/UserValidator.tsx`.

If the registration was successful, the user will be redirected to the user home route (defined under `/client/.env.local`).
If the registration failed (for example because the email is already taken), a proper error message will be displayed. If configured, the user will also receive an email to verify her email address (see section „Email verification“).

If an already authenticated user tries to access `/user/register` she will be redirected to the user home route.

### Login

A user can login under `/user/login`. If the login was successful, the user will be redirected to the user home route (defined under `client/.env.local`). If the login fails, a proper error message will be displayed.

If an already authenticated user tries to access `/user/register` she will be redirected to the user home route.

### Email Verification

Most Web-Apps these days require email verification for new users. As the Laravel Next.js Starter Kit leverages Laravel Sanctum on the backend, the API functionality for email verification comes right out of the box.

**Important**: If you want email verification in your project you MUST properly configure your email settings. Otherwise the application will break, as the Laravel API wants to send an email but does not find the right settings. Find out how to do that in the „Email testing“ section.

Once that’s done you can test things out on the frontend. Visit `/user/register` and create an account. Afterwards, check your email inbox (e.g. MailTrap) for new mails. You will se a new mail with a link to a URL. Click it. By opening the page, a request with information from the URL will be sent to the API. If the verification was successful, you will be redirected to your User Home Route (set in `/client/.env.local`). If the the verification fails an error message will be displayed and you will not be redirected.

If you don’t want email verification on your project, navigate to `app/Models/User` and delete the `implements MustVerifyEmail` part of the class definition statement. Then, delete the `client/pages/user/email` directory and delete the `verifyEmail` function in `/client/store/auth/authActions.tsx`. For security reasons you might also want to deny access to the backend route from the frontend to the API. To accomplish this, open `/config/cors.php` and delete `"email/verify/*"` from the `paths` array.

### Resetting password

A user also has the possibility to reset his password. However, for this to work you must have your mail settings configured correctly. Find out how to do that in the „Email testing“ section.

To test things out visit `/user/password/forgot` and enter the email address of the account. After submission, you will receive an email with a link. The link includes a token that is valid for 60 minutes. By submitting the form you create a new password.

If you do not want the possibility for a user to reset her password, first delete the `/client/pages/password` directory. Afterwards, you can (but don’t have to) navigate to `/client/store/auth/authActions.tsx` and delete the functions `forgotPassword` and `resetPassword`. For security reasons you might also want to deny access to the backend route from the frontend to the API. To accomplish this, open `/config/cors.php` and delete `"password/email"` and `"password/reset"` from the `paths` array.

### User roles

By default, Laravel does not assign user roles. However, there are many use cases for different user roles, for example if an admin should have access to a dashboard with sensible that another user should not be able to see. Therefore, the Laravel Next.js Starter Kit populates the `user` table in the database with an additional column named `role`, which expects a string. You can find this configuration in the user migrations file under `/database/migrations`. There, you'll also see that the default role of a new user is "user".

#### Super-Admin

When running `php artisan migrate:fresh --seed`, a couple of users will be created. The user with the ID 1 is named "Super-Admin" and has the role "admin". This is your super user who should have access to everything.
You can configure the behaviour to your needs under `/database/seeders/UserSeeder`. The `run()` method will be called in the `DatabaseSeeder` when running a fresh migration with a seed.

You can define the email of the Super-Admin in the `.env` at the root directory of your project by changing the `ADMIN_EMAIL_ADDRESS` value. If you leave this value empty it will default to "admin@examplemail.com"

## Protected routes

With traditional Single Page Applications like create-react-app, a common problem is „page flashing“ when trying to redirect a visitor. For example, an authenticated user should be immediately redirected to another page if she tries to access the login route. However, a traditional React app would for a short time still render the login view, as the authentication checks would only be conducted after the first component mount.

This comes to an end with Server Side Rendering (SSR) and this Starter Kit. Before rendering a view, the authentication status of a user is checked and a redirect conducted before the „old“ view is rendered, if necessary. Try it out yourself! Log in and then try to access `/user/login` again. Watch the Url bar! Before anything is rendered to the page you will be redirected the the user home page.

### How it works

In `_app.tsx` the `getInitialProps()` method is called (because `getServerSideProps()` is currently not supported in `_app.tsx`). This allows us to fetch the current user from the api before sending a page to the client. This is done by the `authenticateUser` function from the `AuthGuard` class, which also manages any redirects. As all this takes place before even sending data to the client, we can redirect immediately without any page flashing.

## Styling

The Laravel Next.js Starter Kit comes with [Tailwind CSS](https://tailwindcss.com/), which is a utility-first CSS framework that is highly customizable. For more information on the framework I recommend you take a look at the [docs](https://tailwindcss.com).
You can easily create your own theme by changing the values at `/client/tailwind.config.js`. You can find out more about customisation options [here](https://tailwindcss.com/docs/configuration).

The Tailwind components are injected into the `/client/styles/global.css` file, which is required in the `/client/pages/_app.tsx` file in order to be applied globally.

If you run `npm run dev` Next.js will do some magic under the hood and get your CSS compiled without any further configuration.

## React Components

There are a few custom components at `/client/components`, mostly for demo purposes. These are all components that can be re-used in your pages. I will add more components in the future. Feel free to add, adjust or delete the components according to your needs.

## Google Tag Manager

If you want to build a production ready application you probably want to include tracking tools or other 3rd party scipts. You can of course do all that directly in the source code, but doing it via the [Google Tag Manager](https://tagmanager.google.com/ (GTM) makes this much more easy and flexible. Just create a free GTM account, integrate it to your website and inject all other needed scripts (e.g., Google Analytics) via GTM. This also comes in handy if you want to include a Cookie-Banner from a 3rd Party like [Cookiebot](https://www.cookiebot.com/) and hook it up to your tracking tools in order to meet GDPR standards.

To set it up in your app, all you have to do is navigate to `/client/.env.local` and paste you GTM id (typically starts with „GTM-…“) as the value for the `NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID`. If you do not set this value, the GTM script will simply not be fired. No big deal.

## Contact

If you have feedback, questions or anything else, feel free to leave me a mail under niclastimmdev@gmail.com or hit me up on Twitter under @niclas_timm. Looking forward to hearing from you :).
