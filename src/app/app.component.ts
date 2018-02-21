import { Component, Input } from '@angular/core';
import { CgOverlay } from './crystal-gallery/dom.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	masonry:boolean = true;
	masonryMaxHeight:number = 270;
	masonryGutter:number = 4;
	loop:boolean = true;
	opacity:number = 0.95;

	myImages: any = [
		{
			preview: '/assets/img/yi-sung-tsai-04--vertical--preview.jpg',
			full: '/assets/img/yi-sung-tsai-04--vertical.jpg',
			width: 669,
			height: 1000
		},
		{
			preview: '/assets/img/yi-sung-tsai-01--preview.jpg',
			full: '/assets/img/yi-sung-tsai-01.jpg',
			width: 1000,
			height: 669
		},
		{
			preview: '/assets/img/yi-sung-tsai-02--preview.jpg',
			full: '/assets/img/yi-sung-tsai-02.jpg',
			width: 1000,
			height: 669
		},
		{
			preview: '/assets/img/yi-sung-tsai-03--preview.jpg',
			full: '/assets/img/yi-sung-tsai-03.jpg',
			width: 1000,
			height: 669
		},
		{
			preview: '/assets/img/yi-sung-tsai-04--preview.jpg',
			full: '/assets/img/yi-sung-tsai-04.jpg',
			width: 1000,
			height: 669
		},
		{
			preview: '/assets/img/yi-sung-tsai-05--preview.jpg',
			full: '/assets/img/yi-sung-tsai-05.jpg',
			width: 1000,
			height: 669
		},
		{
			preview: '/assets/img/yi-sung-tsai-06--preview.jpg',
			full: '/assets/img/yi-sung-tsai-06.jpg',
			width: 1000,
			height: 669
		},
		{
			preview: '/assets/img/yi-sung-tsai-07--preview.jpg',
			full: '/assets/img/yi-sung-tsai-07.jpg',
			width: 1000,
			height: 669
		},
		{
			preview: '/assets/img/yi-sung-tsai-08--preview.jpg',
			full: '/assets/img/yi-sung-tsai-08.jpg',
			width: 1000,
			height: 669
		},
		{
			preview: '/assets/img/yi-sung-tsai-09--preview.jpg',
			full: '/assets/img/yi-sung-tsai-09.jpg',
			width: 1000,
			height: 669
		},
		{
			preview: '/assets/img/yi-sung-tsai-10--preview.jpg',
			full: '/assets/img/yi-sung-tsai-10.jpg',
			width: 1000,
			height: 669
		},
		/*
		{
			preview: '/assets/img/yi-sung-tsai-11--preview.jpg',
			full: '/assets/img/yi-sung-tsai-11.jpg',
			width: 1000,
			height: 669
		}
		*/
	];

	myConfig: any = {
		masonry: this.masonry,
		masonryMaxHeight: this.masonryMaxHeight,
		masonryGutter: this.masonryGutter,
		loop: this.loop,
		opacity: this.opacity
	} 

	constructor(
		private overlay: CgOverlay
	) {}

	show(){
        let myImages = [
    		{
    			path: 'https://images.unsplash.com/photo-1495132280856-0de542e5f919?auto=format&fit=crop&w=1950&q=80'
    		},
    		{
    			path: 'https://images.unsplash.com/photo-1495572050486-a9b739c11fb9?auto=format&fit=crop&w=2134&q=80'
    		},
    		{
    			path: 'https://images.unsplash.com/photo-1500295771654-ba174ead99a9?auto=format&fit=crop&w=2091&q=80'
    		}
		];
		let myConfig = {
			masonryGutter: 10,
			loop: true
		};

		this.overlay.open(myImages, myConfig);
	}

	updateConfig(){
		this.myConfig = {
			masonry: this.masonry,
			masonryMaxHeight: this.masonryMaxHeight,
			masonryGutter: this.masonryGutter,
			loop: this.loop,
			opacity: this.opacity
		} 
	}
}