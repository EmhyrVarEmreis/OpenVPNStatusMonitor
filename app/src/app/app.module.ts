import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NG_TABLE_DIRECTIVES} from 'ng2-table/ng2-table';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    NG_TABLE_DIRECTIVES
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
