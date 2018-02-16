import { Component, ElementRef, HostListener, Input, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector: 'masonry-layout', 
    templateUrl: './masonry-layout.component.html',
})

export class MasonryLayoutComponent {
    GUTTER = 0;
    CLASS_NAME: any = '';

    @Input('images') images = []; 
    @Input('masonry') ENABLE_MASONRY = true; 
    @Input('max-height') MAX_HEIGHT = 400; 
    
    @Input('class-name')
    set className(value: any){
        if (Array.isArray(value)){
            this.CLASS_NAME = value.join(' ');
        } else {
            this.CLASS_NAME = value;
        }
    }

    @Input('gutter')
    set gutter(value: any){
        this.GUTTER = value / 2;
    }

    @Output() events: EventEmitter<any> = new EventEmitter<any>();

    nodes: any;
    elem: any;
    savedNodeDimensions: any = [];
    observer: any;
    gridState: any = 'not started';
    resizeTimer: any;
    changesTimer: any;
     
    constructor(private elementRef: ElementRef){
        this.elem = this.elementRef.nativeElement;
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
        clearTimeout(this.resizeTimer);

        this.resizeTimer = setTimeout(() => {
            this.gridState = 'not started';
            this.buildGrid(); 
        }, 250);
    }

    ngOnInit() {
        this.buildGrid();
    }

    ngOnChanges(){
        clearTimeout(this.changesTimer);

        this.changesTimer = setTimeout(() => {
            this.gridState = 'not started';
            this.buildGrid(); 
        }, 250);
    }

    buildGrid(){
        let parentWidth = Math.floor(this.elem.parentNode.offsetWidth);
        let totalRowWidth: any = 0; 
        let row: any = {
            startIndex: 0,
            endIndex: 0,
            length: 0,
            totalWidth: 0
        };

        if (!this.images || !this.images.length){
            return;
        }

        this.elem.style.width = parentWidth +'px';
        this.elem.style.display = 'table';

        this.images.forEach((node, index) => {
            if (row.totalWidth === 0){
                row.startIndex = index;
                row.length = 0;
            }

            row.length++;
            row.totalWidth += this.getComputedWidth(index);
            
            if (row.totalWidth >= parentWidth || this.isLastChild(index)){
                row.endIndex = index;
                let scaling = row.totalWidth/parentWidth;

                this.setColDimensions(scaling, row);
                row.totalWidth = 0; 
            }
        });
    }

    setColDimensions(scaling: any, row: any){
        let totalRowWidth: any = 0;
        let parentWidth = this.elem.parentNode.offsetWidth;
        scaling = (scaling < 1) ? 1 : scaling;

        this.images.forEach((node, index) => {
            if (!this.ENABLE_MASONRY){
                node.computedHeight = this.MAX_HEIGHT + 'px';
                node.computedWidth = this.getComputedWidth(index) + 'px';
                node.margin = this.getNodeMargin(parentWidth);
                return;
            }

            if (index >= row.startIndex && index <= row.endIndex){
                let nodeWidth;

                if (index === row.endIndex && scaling > 1){ 
                    nodeWidth = (100 - totalRowWidth) - ((this.GUTTER * 2) / parentWidth * 100);
                    node.computedWidth = 'calc('+nodeWidth+'%)';

                    if (this.gridState === 'not started'){
                        this.gridState = 'pre-building';

                        setTimeout(() => {
                            this.buildGrid();
                        }, 100);
                    }
                } else {
                    nodeWidth = ((this.getComputedWidth(index) / scaling) / parentWidth * 100) - ((row.length * (this.GUTTER * 2)) * (this.getComputedWidth(index) / scaling) / parentWidth) / parentWidth * 100;
                    node.computedWidth = 'calc('+nodeWidth+'%)';
                    
                    totalRowWidth += nodeWidth;
                    totalRowWidth += (this.GUTTER / parentWidth * 100) * 2;  
                }

                node.margin = this.getNodeMargin(parentWidth);
                node.computedHeight = node.height * ( parentWidth * (nodeWidth / 100) / node.width) + 'px';
                
                /*
                if (row.length > 1){
                    node.computedHeight = this.nodes[row.startIndex].offsetHeight + 'px';
                }
                */
            }
        });
    }

    getComputedWidth(index: any){
        return this.images[index].width / (this.images[index].height / this.MAX_HEIGHT);
    }

    isLastChild(index: any){
        return index + 1 === this.images.length;
    }

    getNodeMargin(parentWidth: any){
        return 'calc('+this.GUTTER / parentWidth * 100+'%)';
    }

    clickOnImage(image: any, i: number){
        this.events.emit({
            type: 'click-on-image',
            image: image,
            index: i
        });
    }
}