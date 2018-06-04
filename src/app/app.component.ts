import { Component, Input } from '@angular/core';
import { CrystalLightbox } from './crystal-gallery/dom.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	myImages: any = [
		{
			preview: '/assets/img/yi-sung-tsai-04--vertical--preview.jpg',
			full: '/assets/img/yi-sung-tsai-04--vertical.jpg',
			width: 669,
			height: 1000,
			description: 'At vero eos et accusamus et iusto odio dignissimos'
		},
		{
			preview: '/assets/img/yi-sung-tsai-01--preview.jpg',
			full: '/assets/img/yi-sung-tsai-01.jpg',
			width: 1000,
			height: 669,
			description: 'Et harum quidem rerum'
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
			height: 669,
			description: 'Temporibus autem quibusdam et aut officiis debitis aut rerum'
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
			height: 669,
			description: 'Nemo enim ipsam voluptatem'
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
			height: 669,
			description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam'
		},
		{
			preview: '/assets/img/yi-sung-tsai-10--preview.jpg',
			full: '/assets/img/yi-sung-tsai-10.jpg',
			width: 1000,
			height: 669,
			description: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil '
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