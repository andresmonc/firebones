import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AboutComponent, HomeComponent } from './public/home.component';
import { SecureHomeComponent } from './secure/securehome/securehome.component';
import { MyProfileComponent } from './secure/profile/myprofile.component';
import { JwtComponent } from './secure/jwttokens/jwt.component';
import { EpisodePageComponent } from './secure/episode-page/episode-page.component';
import { UseractivityComponent } from './secure/useractivity/useractivity.component';
import { LoginComponent } from './public/auth/login/login.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { ForgotPassword2Component, ForgotPasswordStep1Component } from './public/auth/forgot/forgotPassword.component';
import { LogoutComponent, RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { MainEpisodesPageComponent } from './secure/main-episodes-page/main-episodes-page.component';
import { SupportComponent } from './secure/support/support.component';

const homeRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: 'about', component: AboutComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'confirmRegistration/:username', component: RegistrationConfirmationComponent },
            { path: 'resendCode', component: ResendCodeComponent },
            { path: 'forgotPassword/:email', component: ForgotPassword2Component },
            { path: 'forgotPassword', component: ForgotPasswordStep1Component },
            { path: 'newPassword', component: NewPasswordComponent },
            { path: '', component: LoginComponent }
        ]
    },
];

const secureHomeRoutes: Routes = [
    {

        path: '',
        redirectTo: '/securehome/',
        pathMatch: 'full'
    },
    {
        path: 'securehome', component: SecureHomeComponent, children: [
            { path: '', component: MainEpisodesPageComponent, data: { animation: 'MainPAge' } },
            { path: 'logout', component: LogoutComponent },
            { path: 'jwttokens', component: JwtComponent },
            { path: 'episode-page/:id', component: EpisodePageComponent, data: { animation: 'EpisodePage' } },
            { path: 'myprofile', component: MyProfileComponent, data: { animation: 'ProfilePage' } },
            { path: 'useractivity', component: UseractivityComponent, data: { animation: 'UserActivityPage' } },
            { path: 'changepassword', component: ForgotPasswordStep1Component, data: { animation: 'ChangePasswordPage' } },
            { path: 'changepassword/:email', component: ForgotPassword2Component, data: { animation: 'ChangePasswordEmailPage' } },
            { path: 'support', component: SupportComponent, data: { animation: 'SupportPage' } },
            { path: '', component: EpisodePageComponent, data: { animation: 'EpisodePage' } }]
    }
];

const routes: Routes = [
    {
        path: '',
        children: [
            ...homeRoutes,
            ...secureHomeRoutes,
            {
                path: '',
                component: HomeComponent
            },
            { path: '**', component: PageNotFoundComponent }
        ]
    },


];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
