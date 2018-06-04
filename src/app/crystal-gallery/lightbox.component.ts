import { 
    Component, 
    Input, 
    EventEmitter, 
    OnInit, 
    HostBinding, 
    HostListener, 
    ViewChild, 
    ElementRef, 
    ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'crystal-lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./css/lightbox.component.css']
})
export class LightboxComponent {
    _index: any;
    prevIndex: any;
    currImageLoaded: any; 
    prevImageHide: any;
    wrapperProp: any;
    _data: any;
    currentImageIndex: number = 0;
    spinnerHeight: number = 30;
    descriptionHeight: number = 43;

    @Input() data: any;

    close = new EventEmitter();

    @HostBinding('class.cg-show') showLightbox: boolean = false;
    @HostBinding('class.cg-hide-controls') hideControls: boolean = false;
    @HostBinding('style.transition') hostStyleTransition: string;
    @HostBinding('style.backgroundColor') hostStyleBackgroundColor: string;

    @ViewChild('currImageElem') currImageElem: ElementRef;
    @ViewChild('prevImageElem') prevImageElem: ElementRef;
    @ViewChild('wrapper') wrapperElem: ElementRef;

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

        if (!image){
            return false;
        }

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

    get description(){
        return this.images[this.index].description;
    }

    get counter(){
        return this.currentImageIndex + 1 +'/'+ this.images.length;
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
                this.closeLightbox();
                break;
        }
    }

    @HostListener("mouseenter", ['$event'])
    onMouseEnter(event: any) {
        this.hideControls = false;
    }

    constructor(private elementRef: ElementRef, private ref: ChangeDetectorRef){
    }

    ngOnInit(){
        this.setBackgroundOpacity(this.config.backgroundOpacity);
        this.currentImageIndex = this.config.index;
        //document.body.style.overflow = 'hidden';

        setTimeout(() => {
            this.showLightbox = true;
        }, 30);

        this.setMaxDimensions();
        this.setAnimationDuration();
    }

    closeLightbox(){
        this.showLightbox = false;
        setTimeout(() => {
           this.close.emit('close');
           //document.body.style.overflow = '';
        }, this.config.animationDuration); 
    }

    next(){
        if (this.isLast){
            if (this.config.loop){
                this.currentImageIndex = 0;
            } else {
                return;
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

        this.setMaxDimensions();
    }
    prev(){
        if (this.isFirst){
            if (this.config.loop){
                this.currentImageIndex = this.latestImageIndex;
            } else {
                return;
            }
        } else {
            this.currentImageIndex--;
        }

        setTimeout(() => {
            if (this.currImageLoaded === 'loading'){
                this.currImageLoaded = false;
            }
        }, 50);

        this.setMaxDimensions();
    }

    onImageLoaded(){
        this.currImageLoaded = true;
        this.ref.detectChanges();
    }

    setBackgroundOpacity(opacity: any){
        this.hostStyleBackgroundColor = 'rgba(0, 0, 0, '+opacity+')';
    }

    setMaxDimensions(){
        if (this.description){
            this.wrapperElem.nativeElement.style.height = 'calc(100% - ' + (this.descriptionHeight * 2) + 'px)';
        } else {
            this.wrapperElem.nativeElement.style.height = '';
        }

        this.currImageElem.nativeElement.style.maxHeight = 'calc(' + this.config.lightboxMaxHeight + ')';
        this.currImageElem.nativeElement.style.maxWidth = this.config.lightboxMaxWidth;
    }

    setAnimationDuration(){
        this.hostStyleTransition = 'opacity '+this.config.animationDuration+'ms';
    }
}