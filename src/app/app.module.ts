import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BASE_PATH } from '@finbourne/lusid-sdk-angular8';

import { environment } from 'environment';

import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent, PortfolioListComponent } from './components';
import { DefaultLayoutComponent } from './layouts';
import { AuthInterceptor } from './services';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    PortfolioListComponent,
    DefaultLayoutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [
    { provide: BASE_PATH, useValue: `https://${environment.clientCode}.lusid.com/api` },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
