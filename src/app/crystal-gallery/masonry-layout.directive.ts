import { Directive, ElementRef, HostListener, HostBinding, Input, AfterViewInit, OnInit } from '@angular/core';

@Directive({
    selector: '[masonry-layout]'
})

export class MasonryLayoutDirective {
    GUTTER = 0;

    @Input('masonry') ENABLE_MASONRY = true; 
    @Input('max-height') MAX_HEIGHT = 400; 

    @Input('gutter')
    set gutter(value: any){
        this.GUTTER = value / 2;
    }

    nodes: any;
    elem: any;
    savedNodeDimensions: any = [];
    observer: any;
    gridState: any = 'not started';
    resizeTimer: any;
     
    constructor(private elementRef: ElementRef){
        this.elem = this.elementRef.nativeElement;
    }

    @HostBinding('class.cg-show') wrapperShow: any = false;

    @HostListener('window:resize', ['$event'])
    onWindowResize(event) {
        clearTimeout(this.resizeTimer);

        this.resizeTimer = setTimeout(() => {
            this.gridState = 'not started';
            this.hideNodes();
            this.buildGrid(); 
        }, 250);
    }

    ngOnInit() {
        this.nodes = this.getNodes();
        this.saveNodesDimensions();
        this.hideNodes();

        this.observer = new MutationObserver(mutations => {
            this.nodes = this.getNodes();
            this.saveNodesDimensions();
            this.buildGrid();
        });
        let config = { childList: true };
        this.observer.observe(this.elem, config);
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

        this.elem.style.width = parentWidth +'px';

        this.nodes.some((node, index) => {
            node.style.float = 'left';

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

        if (this.nodes.length === 1){
            this.wrapperShow = true;
        }

        this.nodes.some((node, index) => {
            node.style.display = 'block';

            if (!this.ENABLE_MASONRY){
                node.style.height = this.MAX_HEIGHT + 'px';
                node.style.width = this.getComputedWidth(index) + 'px';

                if (index === row.endIndex && scaling > 1){ // исправить, scaling может быть равен 1
                    this.wrapperShow = true;
                }
                return;
            }

            if (index >= row.startIndex && index <= row.endIndex){
                let nodeWidth;

                if (index === row.endIndex && scaling > 1){ 
                    nodeWidth = (100 - totalRowWidth) - ((this.GUTTER * 2) / parentWidth * 100);
                    node.style.width = 'calc('+nodeWidth+'%)';
                    this.wrapperShow = true;

                    if (this.gridState === 'not started'){
                        this.gridState = 'pre-building';

                        setTimeout(() => {
                            this.buildGrid();
                        }, 100);
                    }
                } else {
                    nodeWidth = ((this.getComputedWidth(index) / scaling) / parentWidth * 100) - ((row.length * (this.GUTTER * 2)) * (this.getComputedWidth(index) / scaling) / parentWidth) / parentWidth * 100;
                    node.style.width = 'calc('+nodeWidth+'%)';
                    
                    totalRowWidth += nodeWidth;
                    totalRowWidth += (this.GUTTER / parentWidth * 100) * 2;  
                }

                node.style.margin = this.getNodeMargin(parentWidth);
                node.style.height = '';
                
                if (row.length > 1){
                    node.style.height = this.nodes[row.startIndex].offsetHeight + 'px';
                }
            }
        });
    }

    getNodes(){
        return Array.prototype.slice.call( this.elem.children );
    }

    getComputedWidth(index: any){
        return this.savedNodeDimensions[index].width / (this.savedNodeDimensions[index].height / this.MAX_HEIGHT);
    }

    saveNodesDimensions(){
        this.nodes.some((node, index) => {
            let width;
            let height;
            let self = this;         

            if (node.getElementsByTagName("img")[0]){
                let img = node.getElementsByTagName("img")[0];
                width = img.naturalWidth;
                height = img.naturalHeight;
                
                img.onload = function(){
                    width = img.naturalWidth;
                    height = img.naturalHeight;
                    self.savedNodeDimensions[index] = Object.assign({}, { width, height });
                    self.buildGrid();
                }
            } else {
                width = node.naturalWidth ? node.naturalWidth : node.offsetWidth;
                height = node.naturalHeight ? node.naturalHeight : node.offsetHeight;

                node.onload = function(){ 
                    width = node.naturalWidth ? node.naturalWidth : node.offsetWidth;
                    height = node.naturalHeight ? node.naturalHeight : node.offsetHeight;
                    self.savedNodeDimensions[index] = Object.assign({}, { width, height });
                    self.buildGrid();
                }
            }

            this.savedNodeDimensions[index] = Object.assign({}, { width, height });
        });
    }

    isLastChild(index: any){
        return index + 1 === this.nodes.length;
    }

    hideNodes(){
        this.nodes.some((node, index) => {
            node.style.display = 'none';
        });
    }

    getNodeMargin(parentWidth: any){
        return 'calc('+this.GUTTER / parentWidth * 100+'%)';
    }
}