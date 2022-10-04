import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OperatorComponent } from './operator/operator.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    OperatorComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([
    //   {path: '', component: OperatorComponent},
    // ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
