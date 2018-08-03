import { Component, Input } from '@angular/core';
import { CrystalLightbox } from './crystal-gallery/dom.service';

@Component({
	selector: 'app-root',
	templateUrl: './demo.component.html',
	styleUrls: ['./demo.component.css']
})
export class DemoComponent {

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
			preview: '/assets/img/yi-sung-tsai-03--preview.jpg',
			full: '/assets/img/yi-sung-tsai-03.jpg',
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
	];

	lightboxUsageImages: any = [
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
			preview: '/assets/img/yi-sung-tsai-09--preview.jpg',
			full: '/assets/img/yi-sung-tsai-09.jpg',
			width: 1000,
			height: 669
		},
	];

	myConfig: any = {
		masonry: true,
		masonryMaxHeight: 195,
		masonryGutter: 6,
		loop: false,
		backgroundOpacity: 0.85,
		animationDuration: 100,
		counter: true,
		lightboxMaxHeight: '100vh - 86px',
		lightboxMaxWidth: '100%'
	} 

	constructor(private lightbox: CrystalLightbox) {}
}