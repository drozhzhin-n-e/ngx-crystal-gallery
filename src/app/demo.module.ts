import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DemoComponent } from './demo.component';

import { CrystalGalleryModule } from './crystal-gallery/gallery.module';

@NgModule({
    declarations: [
        DemoComponent
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
        DemoComponent
    ],
    entryComponents: [
        
    ]
})
export class DemoModule { }
