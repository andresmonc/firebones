import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserRegistrationService } from './service/user-registration.service';
import { UserParametersService } from './service/user-parameters.service';
import { UserLoginService } from './service/user-login.service';
import { CognitoUtil } from './service/cognito.service';
import { routing } from './app-routing.module';
import { AboutComponent, HomeComponent } from './public/home.component';
import { AwsUtil } from './service/aws.service';
import { UseractivityComponent } from './secure/useractivity/useractivity.component';
import { MyProfileComponent } from './secure/profile/myprofile.component';
import { SecureHomeComponent } from './secure/securehome/securehome.component';
import { JwtComponent } from './secure/jwttokens/jwt.component';
import { DynamoDBService } from './service/ddb.service';
import { LoginComponent } from './public/auth/login/login.component';
import { RegisterComponent } from './public/auth/register/registration.component';
import { ForgotPassword2Component, ForgotPasswordStep1Component } from './public/auth/forgot/forgotPassword.component';
import { LogoutComponent, RegistrationConfirmationComponent } from './public/auth/confirm/confirmRegistration.component';
import { ResendCodeComponent } from './public/auth/resend/resendCode.component';
import { NewPasswordComponent } from './public/auth/newpassword/newpassword.component';
import { MFAComponent } from './public/auth/mfa/mfa.component';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatTableModule, MatFormFieldModule } from '@angular/material';
import {
    MatSidenavModule, MatTabsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
    MatRadioModule, MatGridListModule, MatCardModule, MatMenuModule, MatPaginatorModule,
    MatSortModule, MatAutocompleteModule, MatButtonToggleModule, MatChipsModule, MatDialogModule,
    MatExpansionModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule, MatRippleModule,
    MatSelectModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatStepperModule, MatTooltipModule, MatBadgeModule
} from '@angular/material';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EpisodePageComponent } from './secure/episode-page/episode-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './public/page-not-found/page-not-found.component';
import { BannerComponent } from './secure/banner/banner.component';
import { WINDOW_PROVIDERS } from './service/window.service';
import { NavbarComponent } from './secure/navbar/navbar.component';
import { MainEpisodesPageComponent } from './secure/main-episodes-page/main-episodes-page.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { SupportComponent } from './secure/support/support.component';
import { EmailService } from './service/email.service';
import { HttpClientModule } from '@angular/common/http';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
import { GlobalMessageModalComponent } from './global-message-modal/global-message-modal.component';

@NgModule({
    declarations: [
        NewPasswordComponent,
        LoginComponent,
        LogoutComponent,
        RegistrationConfirmationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        RegisterComponent,
        MFAComponent,
        AboutComponent,
        HomeComponent,
        UseractivityComponent,
        MyProfileComponent,
        SecureHomeComponent,
        JwtComponent,
        AppComponent,
        EpisodePageComponent,
        PageNotFoundComponent,
        BannerComponent,
        NavbarComponent,
        MainEpisodesPageComponent,
        LoadingScreenComponent,
        SupportComponent,
        YoutubePlayerComponent,
        GlobalMessageModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatBadgeModule,
        routing,
        HttpClientModule
    ],
    providers: [
        CognitoUtil,
        AwsUtil,
        DynamoDBService,
        UserRegistrationService,
        UserLoginService,
        UserParametersService,
        EmailService,
        WINDOW_PROVIDERS
    ],
    bootstrap: [AppComponent],
    entryComponents: [GlobalMessageModalComponent]
})
export class AppModule {
}
