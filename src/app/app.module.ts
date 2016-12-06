import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { ListingComponent } from './components/listing/listing.component';
import { DetailComponent } from './components/detail/detail.component';
import { PlanetDataService } from './services/planet-data.service';

@NgModule({
    declarations: [
        AppComponent,
        AppComponent,
        HeaderComponent,
        ListingComponent,
        DetailComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot()
    ],
    providers: [PlanetDataService], // needs to be singleton- provide here only 
    bootstrap: [AppComponent]
})
export class AppModule { }
