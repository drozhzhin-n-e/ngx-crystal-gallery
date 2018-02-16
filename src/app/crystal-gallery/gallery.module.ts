import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayComponent } from './overlay.component';
import { OverlayMobileComponent } from './overlay-mobile.component';
import { GalleryComponent } from './gallery.component';
import { CgOverlay } from'./dom.service' 
import { MasonryLayoutComponent } from './masonry-layout.component'; 
import { PinchDirective } from './pinch.directive'; 

@NgModule({
    declarations: [
        OverlayComponent,
        OverlayMobileComponent,
        GalleryComponent,
        MasonryLayoutComponent,
        PinchDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        GalleryComponent
    ],
    providers: [
        CgOverlay
    ],
    bootstrap: [
        
    ],
    entryComponents: [
        OverlayComponent,
        OverlayMobileComponent
    ]
})
export class CrystalGalleryModule { }
