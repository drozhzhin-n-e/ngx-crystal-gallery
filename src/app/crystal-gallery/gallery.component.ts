import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CrystalLightbox } from'./dom.service'

@Component({
	selector: 'crystal-gallery', 
	templateUrl: './gallery.component.html',
    styleUrls: ['./css/gallery.component.css'],
})
export class GalleryComponent {

    @Input('images') images: any;
    @Input('config') config: any = {};

    @ViewChild('contentWrapper') contentWrapper: ElementRef;

    get isNgContent(){
        return this.contentWrapper.nativeElement.children.length > 0;
    }

    get masonryState(){
        return this.config.masonry;
    }

    get masonryMaxHeight(){
    	return this.config.masonryMaxHeight;
    }

    get masonryGutter(){
    	return this.config.masonryGutter;
    }

	constructor(
		private lightbox: CrystalLightbox,
		private elementRef: ElementRef
	) {}

	showLightbox(images: any, i: number){
        this.config.index = i;
		this.lightbox.open(images, this.config);
	}

    handleMasonryLayoutEvents(event){
        this.showLightbox(this.images, event.index);
    }
}