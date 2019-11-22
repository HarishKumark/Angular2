import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth.interceptor.service';
import { WweFeatureComponent } from './wwe-feature/wwe-feature.component';
import { AcceptanceCriteriaComponent } from './acceptance-criteria/acceptance-criteria.component';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';



@NgModule({
  declarations: [
    AppComponent,
    WweFeatureComponent,
    AcceptanceCriteriaComponent,
    DialogOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [
    DatePipe],
  bootstrap: [AppComponent],
  entryComponents:[DialogOverviewComponent]
})
export class AppModule { }
