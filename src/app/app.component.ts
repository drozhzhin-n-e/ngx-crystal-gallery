import { Component, Input } from '@angular/core';
import { CgOverlay } from './crystal-gallery/dom.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	images: any = [
		
		{
			preview: '/assets/img/virginie-khateeb-1.jpg', 
			full: '/assets/img/virginie-khateeb-1.jpg'
		},
		{
			preview: '/assets/img/rasmus-hjortshoj-2.jpg', 
			full: '/assets/img/rasmus-hjortshoj-2.jpg'
		},
		{
			preview: '/assets/img/rasmus-hjortshoj-3.jpg', 
			full: '/assets/img/rasmus-hjortshoj-3.jpg'
		},
		{
			preview: '/assets/img/rasmus-hjortshoj-5.jpg', 
			full: '/assets/img/rasmus-hjortshoj-5.jpg'
		},
		{
			preview: '/assets/img/rasmus-hjortshoj-6.jpg', 
			full: '/assets/img/rasmus-hjortshoj-6.jpg'
		},
		{
			preview: '/assets/img/rasmus-hjortshoj-7.jpg', 
			full: '/assets/img/rasmus-hjortshoj-7.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-101_710.jpg', 
			full: '/assets/img/2_Island_I-101_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-102_710.jpg', 
			full: '/assets/img/2_Island_I-102_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-104_710.jpg', 
			full: '/assets/img/2_Island_I-104_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-106_710.jpg', 
			full: '/assets/img/2_Island_I-106_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-107_710.jpg', 
			full: '/assets/img/2_Island_I-107_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-109_710.jpg', 
			full: '/assets/img/2_Island_I-109_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-110_710.jpg', 
			full: '/assets/img/2_Island_I-110_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-111_710.jpg', 
			full: '/assets/img/2_Island_I-111_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-112_710.jpg', 
			full: '/assets/img/2_Island_I-112_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-113_710.jpg', 
			full: '/assets/img/2_Island_I-113_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-115_710.jpg', 
			full: '/assets/img/2_Island_I-115_710.jpg'
		},
		{
			preview: '/assets/img/2_IslandB-100-5_710.jpg', 
			full: '/assets/img/2_IslandB-100-5_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-119_710.jpg', 
			full: '/assets/img/2_Island_I-119_710.jpg'
		},
		{
			preview: '/assets/img/2_Island_I-127_710.jpg', 
			full: '/assets/img/2_Island_I-127_710.jpg'
		},
	];

	prop: any = {
		masonry: true,
		masonryMaxHeight: 200,
		masonryGutter: 3,
		loop: false,
		opacity: 0.95
	} 

	constructor(
		private overlay: CgOverlay
	) {}

	show(){
        let images = [
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
		let config = {
			masonryGutter: 10,
			loop: true
		};

		this.overlay.open(images, config);
	}
}