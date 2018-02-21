import { Component, Input, EventEmitter, OnInit, HostBinding, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'crystal-overlay-mobile',
	templateUrl: './overlay-mobile.component.html',
    styleUrls: ['./css/overlay-mobile.component.css']
})
export class OverlayMobileComponent { 
	_index: any;
    prevIndex: any;
    nextIndex: any;

    currImage = {
        show: false,
        loaded: false,
        index: 0
    }; 

    prevImage = {
        loaded: false
    }; 

    nextImage = {
        loaded: false
    }; 

    wrapperProp: any;
    landscapeMode: any;

	close = new EventEmitter();

    @Input() data: any;

    @ViewChild('wrapper') wrapperEl: ElementRef;

    get images(){
        return this.data.images;
    }

    get config(){
        return this.data.config;
    }

    get index(){
        return this.currImage.index;
    }

    get currImagePath(){
        let image = this.images[this.index];

        if (!image){
            return false;
        }

        if (image.path){
            image.full = image.path;
        }
        
        return image;
    }

    get prevImagePath(){
        if (this.prevIndex < 0 && this.config.loop){
            this.prevIndex = this.latestImageIndex;
        }

        let image = this.images[this.prevIndex];

        if (image && image.path){
            image.full = image.path;
        }
        return image;
    }

    get nextImagePath(){
        let image = this.images[this.nextIndex];

        if (image && image.path){
            image.full = image.path;
        }
        return image;
    }

    get isFirst(){
        if (this.config.loop){
            return false;
        } else {
    	    return this.index === 0;
        }
    }

    get isLast(){
        if (this.config.loop){
            return false;
        } else {
            return this.index === this.latestImageIndex;
        }        
    }

    get latestImageIndex(){
        return this.images.length - 1;
    }

    get isLandscape(){
        return window.innerWidth > window.innerHeight;
    }

    @HostBinding('class.cg-show') overlayShown: boolean = false;

    @HostListener('window:resize', ['$event'])
    onWindowResize(event: any) {
        this.landscapeMode = this.isLandscape;
        this.ref.detectChanges();
    }

    constructor(private elementRef: ElementRef, private ref: ChangeDetectorRef){
    }

    ngOnInit(){
        this.currImage.index = this.config.index;
        this.prevIndex = this.currImage.index-1;
        this.nextIndex = this.currImage.index+1;

        this.showOverlay();
    }

    showOverlay(){
        this.currImage.show = true;
        setTimeout(() => {
           this.overlayShown = true;
        }, 30);
    }

	closeOverlay(){
		this.overlayShown = false;
        setTimeout(() => {
           this.close.emit(true);
        }, 200); 
	}

    slide(event: any){
        if (event === 'next'){
            
            if (this.isLast){
                return;
            } else {
                setTimeout(() => {
                    this.currImage.index++;
                }, 200); 
            }

            if (this.index === this.latestImageIndex){
                setTimeout(() => {
                    this.currImage.index = 0;
                }, 200); 
            }

            setTimeout(() => {
                this.afterSlide('next');
            }, 300); 
        }

        if (event === 'prev'){

            if (this.isFirst){
                return;
            } else {
                setTimeout(() => {
                    this.currImage.index--;
                }, 200); 
            }

            if (this.index === 0){
                setTimeout(() => {
                    this.currImage.index = this.latestImageIndex;
                }, 200); 
            }

            setTimeout(() => {
                this.afterSlide('prev');
            }, 300); 
        }
    }

    afterSlide(eventType: any){
        this.currImage.show = true;
        
        if (this.index === this.latestImageIndex && this.config.loop){
            this.nextIndex = 0;
        } else {
            this.nextIndex = this.index+1;
        }

        if (this.index === 0 && this.config.loop){
            this.prevIndex = this.latestImageIndex;
        } else {
            this.prevIndex = this.index-1;
        }

        if (eventType === 'prev'){

            if (!this.prevImage.loaded){
                this.currImage.loaded = false;
                this.prevImage.loaded = false;
            }
            if (!this.currImage.loaded){
                this.nextImage.loaded = false;
            }
        }

        if (eventType === 'next'){

            if (!this.nextImage.loaded){
                this.currImage.loaded = false;
                this.nextImage.loaded = false;
            }
            if (!this.currImage.loaded){
                this.prevImage.loaded = false;
            }
        }

        this.defaultWrapperPosition();
        this.ref.detectChanges();
    }

    onImageLoaded(elem: any){
        this[elem].loaded = true;
        this.ref.detectChanges();
    }

    handlePinchEvents($event){
        if ($event === 'prev'){
            this.slide('prev');
        }
        if ($event === 'next'){
            this.slide('next');
        }
    }

    defaultWrapperPosition(){
        let elem = this.wrapperEl.nativeElement;
        elem.style.transition = 'all 0ms';
        elem.style.transform = 'matrix(1, 0, 0, 1, 0, 0)';
        elem.style.webkitTransform = 'matrix(1, 0, 0, 1, 0, 0)';
    }
}