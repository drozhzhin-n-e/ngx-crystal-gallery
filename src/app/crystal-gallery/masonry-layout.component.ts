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
     
    get isMobile() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor);
        return check;
    };

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

                // last image
                if (index === row.endIndex && scaling > 1){ 
                    nodeWidth = (100 - totalRowWidth) - ((this.GUTTER * 2) / parentWidth * 100);
                    node.computedWidth = 'calc('+nodeWidth+'%)';

                    if (this.gridState === 'not started'){
                        this.gridState = 'pre-building';

                        setTimeout(() => {
                            this.buildGrid();
                        }, 100);
                    }
                } 
                else {
                    nodeWidth = ((this.getComputedWidth(index) / scaling) / parentWidth * 100) - ((row.length * (this.GUTTER * 2)) * (this.getComputedWidth(index) / scaling) / parentWidth) / parentWidth * 100;
                    node.computedWidth = 'calc('+nodeWidth+'%)';
                    
                    totalRowWidth += nodeWidth;
                    totalRowWidth += (this.GUTTER / parentWidth * 100) * 2;  
                }

                // last row and last image
                if (index === row.endIndex && row.length === 1 && this.isMobile){
                    nodeWidth = 100 - ((this.GUTTER * 2) / parentWidth * 100);
                    node.computedWidth = 'calc('+nodeWidth+'%)';
                }

                node.margin = this.getNodeMargin(parentWidth);
                node.computedHeight = node.height * ( parentWidth * (nodeWidth / 100) / node.width) + 'px';
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

    onImageLoaded(elem){
        elem.style.opacity = 1;
    }
}