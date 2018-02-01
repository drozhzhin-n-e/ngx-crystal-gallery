import { Component, Input, EventEmitter, OnInit, HostBinding, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'crystal-overlay',
	templateUrl: './overlay.component.html',
    styleUrls: ['./css/overlay.component.css']
})
export class OverlayComponent {
	_index: any;
    prevIndex: any;
    currImageLoaded: any; 
    prevImageHide: any;
    wrapperProp: any;
    _data: any;
    currentImageIndex: number;

    @Input() data: any;

	close = new EventEmitter();

	@HostBinding('class.cg-show') showOverlay: boolean = false;
    @HostBinding('class.cg-hide-controls') hideControls: boolean = false;

    @ViewChild('currImageElem') currImageElem: ElementRef;
    @ViewChild('prevImageElem') prevImageElem: ElementRef;

    get images(){
        return this.data.images;
    }

    get config(){
        return this.data.config;
    }

    get index(){
        return this.currentImageIndex;
    }

    get currImagePath(){
        let image = this.images[this.index];

        if (image.path){
            image.full = image.path;
        }
        return image;
    }

    get prevImagePath(){
        return this.images[this.prevIndex];
    }

    set prevImagePath(value: any){
        this.images[this.prevIndex] = value;
    }

    get isFirst(){
    	return this.index === 0;
    }

    get isLast(){
    	return this.index === (this.images.length-1);
    }

    get latestImageIndex(){
        return this.images.length - 1;
    }

    get windowWidth(){
        return window.innerWidth;
    }
    get windowHeight(){
        return window.innerHeight;
    }

    get wrapperWidth(){
        if (this.wrapperProp){
            return this.wrapperProp.width / this.windowWidth;
        }
    }
    get wrapperHeight(){
        if (this.wrapperProp){
            return this.wrapperProp.height / this.windowHeight
        }
    }

    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: any) {
        switch(event.key) {
            case 'ArrowLeft':
                this.prev();
                break;
            case 'ArrowRight':
                this.next();
                break;
            case 'Escape':
                this.closeOverlay();
                break;
        }
    }

    @HostListener("mouseenter", ['$event'])
    onMouseEnter(event: any) {
        this.hideControls = false;
    }

/*
    @HostListener("mouseleave", ['$event'])
    onMouseLeave(event: any) {
        setTimeout(() => {
            this.hideControls = true;
        }, 3000);
    }
*/
    @HostListener('window:resize', ['$event'])
    onWindowResize(event: any) {
        this.wrapperProp = this.getDimensions('currImageElem');
    }

    constructor(private elementRef: ElementRef, private ref: ChangeDetectorRef){
    }

    ngOnInit(){
        this.setBackgroundOpacity(this.config.opacity);
        this.currentImageIndex = this.config.index;

        setTimeout(() => {
            this.showOverlay = true;
        }, 30);
    }

	closeOverlay(){
		this.showOverlay = false;
        setTimeout(() => {
           this.close.emit('close');
        }, 200); 
	}

	next(){
        if (this.isLast){
            if (!this.config.loop){
                return;
            } else {
                this.currentImageIndex = 0;
            }
        } else {
            this.currentImageIndex++;
        }

        this.currImageLoaded = 'loading';

        setTimeout(() => {
            if (this.currImageLoaded === 'loading'){
                this.currImageLoaded = false;
            }
        }, 50);
	}
	prev(){
        if (this.isFirst){
            if (!this.config.loop){
                return;
            } else {
                this.currentImageIndex = this.latestImageIndex;
            }
        } else {
            this.currentImageIndex--;
        }

        setTimeout(() => {
            if (this.currImageLoaded === 'loading'){
                this.currImageLoaded = false;
            }
        }, 50);
	}

    onImageLoaded(){
        this.currImageLoaded = true;
        this.ref.detectChanges();
        this.transitionAnim();
    }

    transitionAnim(){
        this.wrapperProp = this.getDimensions('currImageElem');
    }

    getDimensions(elem: any){
        let imageElem = this[elem].nativeElement;
        let dimensions = {
            width: imageElem.naturalWidth,
            height: imageElem.naturalHeight
        }

        if (dimensions.height > window.innerHeight){
            dimensions.height = window.innerHeight;
            dimensions.width = dimensions.height * (imageElem.naturalWidth/imageElem.naturalHeight);
        }
        if (dimensions.width > window.innerWidth){
            dimensions.width = window.innerWidth;
            dimensions.height = dimensions.width / (imageElem.naturalWidth/imageElem.naturalHeight);
        }
        return dimensions;
    }

    setBackgroundOpacity(opacity: any){
        this.elementRef.nativeElement.style.backgroundColor = 'rgba(0, 0, 0, '+opacity+')';
    }
}