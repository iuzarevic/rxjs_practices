import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HigherOrderOperatorsComponent } from './higher-order-operators/higher-order-operators.component';

import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import { ConditionalOperatorsComponent } from './conditional-operators/conditional-operators.component';
import { CombineOperatorsComponent } from './combine-operators/combine-operators.component';
import { SharingStreamComponent } from './sharing-stream/sharing-stream.component';

@NgModule({
  declarations: [
    AppComponent,
    HigherOrderOperatorsComponent,
    ConditionalOperatorsComponent,
    CombineOperatorsComponent,
    SharingStreamComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DropdownModule,
    TableModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
