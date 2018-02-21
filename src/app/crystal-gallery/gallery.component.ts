import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CgOverlay } from'./dom.service'

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
		private overlay: CgOverlay,
		private elementRef: ElementRef
	) {}

	showOverlay(images: any, i: number){
        this.config.index = i;
		this.overlay.open(images, this.config);
	}

    handleMasonryLayoutEvents(event){
        this.showOverlay(this.images, event.index);
    }
}