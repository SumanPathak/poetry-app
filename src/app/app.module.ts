import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoemCoupletComponent } from './poem-couplet/poem-couplet.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { PoemCoupletService } from './shared/poem-couplet/poem-couplet.service';
import { RhymeService } from './shared/rhyme-service/rhyme.service';

@NgModule({
  declarations: [
    AppComponent,
    PoemCoupletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    HttpClientModule
  ],
  providers: [PoemCoupletService, RhymeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
