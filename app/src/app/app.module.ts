import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';

import {AppComponent} from './app.component';
import {DataService} from "./service/data.service";
import {HttpModule, JsonpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    NG_TABLE_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
