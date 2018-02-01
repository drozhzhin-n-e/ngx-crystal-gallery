import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CgOverlay } from'./dom.service'

@Component({
	selector: 'crystal-gallery', 
	templateUrl: './gallery.component.html',
    styleUrls: ['./css/gallery.component.css'],
})
export class GalleryComponent {

    @Input('images') images: any;
    @Input('prop') prop: any = {};

    @ViewChild('contentWrapper') contentWrapper: ElementRef;

    get isNgContent(){
        return this.contentWrapper.nativeElement.children.length > 0;
    }

    get masonryState(){
        return this.prop.masonry;
    }

    get masonryMaxHeight(){
    	return this.prop.masonryMaxHeight;
    }

    get masonryGutter(){
    	return this.prop.masonryGutter;
    }

	constructor(
		private overlay: CgOverlay,
		private elementRef: ElementRef
	) {}

	showOverlay(images: any, i: number){
        this.prop.index = i;
		this.overlay.open(images, this.prop);
	}
}