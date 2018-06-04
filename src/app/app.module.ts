import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { CrystalGalleryModule } from './crystal-gallery/gallery.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        CrystalGalleryModule,
    ],
    providers: [
        
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents: [
        
    ]
})
export class AppModule { }
