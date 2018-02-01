import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
    selector: '[pinch]'
})

export class PinchDirective{

    elem: any;
    eventType: any;

    scale: any = 1;
    initialScale: any = 1;

    startX: any;
    startY: any;

    moveX: any = 0;
    moveY: any = 0;
    initialMoveX: any = 0;
    initialMoveY: any = 0;

    moveXC: any;
    moveYC: any;

    distance: any;
    initialDistance: any;

    isNextImageLoaded: any = true;

    @Input() isLast: any;
    @Input() isFirst: any;

    @Output() events = new EventEmitter<boolean>();
     
    constructor(private elementRef: ElementRef){
        this.elem = this.elementRef.nativeElement;
    }

    @HostListener('touchstart', ['$event'])
    touchstartHandler(event) {
        this.elem.style.transformOrigin = '0 0';
    }

    @HostListener('touchmove', ['$event'])
    touchmoveHandler(event) {
        let touches = event.touches;

        if (touches.length === 1 && this.scale === 1 && !this.eventType || this.eventType == 'swipe'){
            event.preventDefault();

            if (!this.isNextImageLoaded) {
                return;
            }

            if (!this.eventType){
                this.startX = event.touches[0].pageX;
                this.startY = event.touches[0].pageY;
            }

            this.eventType = 'swipe';

            this.moveX = this.initialMoveX + (event.touches[0].pageX - this.startX);
            this.moveY = 0;

            this.transformElem(0);
        }
    }

    @HostListener('touchend', ['$event'])
    touchendHandler(event) {
        let touches = event.touches;
        let img = this.elem.getElementsByTagName("img")[0];

        if (!this.isNextImageLoaded) {
            return;
        }
        
        if (this.scale < 1){
            this.scale = 1;
        }
        if (this.moveY > 0){
            this.moveY = 0;
        } 

        if (this.moveX > 100){
            this.slide('prev');
        } else if (this.moveX < -100){
            this.slide('next');
        } else {
            this.moveX = 0;
        }

        this.initialScale = this.scale;
        this.initialMoveX = this.moveX;
        this.initialMoveY = this.moveY;

        this.transformElem(200); 

        this.eventType = 'touchend';        
        if (touches.length == 0){
            this.eventType = '';
        }
    }

    slide(event: any){
        this.onSlide(event);

        if (event === 'prev'){
            this.moveX = window.innerWidth + 8; 
            if (this.isFirst){
                this.moveX = 0;
            }
        }
        if (event === 'next'){
            this.moveX = -window.innerWidth - 8;
            if (this.isLast){
                this.moveX = 0;
            }
        }

        this.isNextImageLoaded = false;

        setTimeout(() => {
            this.moveX = 0;
            this.initialMoveX = 0;
            this.isNextImageLoaded = true;
        }, 200);
    }

    onSlide(evenType:any) {
        this.events.emit(evenType);
    }

    transformElem(duration: any = 50){
        let matrixVal = 'matrix('+ Number(this.scale) +','+ 0 +','+ 0 +','+ Number(this.scale) +','+ Number(this.moveX) +','+ Number(this.moveY) +')';
        
        this.elem.style.transition = 'all '+ duration +'ms';
        this.elem.style.transform = matrixVal;
        this.elem.style.webkitTransform = matrixVal;
    }
}