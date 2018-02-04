The module includes a masonry layout and a full-image preview window. Mobile devices are supported.

## Installation

Install the npm package.

    npm i ngx-crystal-gallery
        
Import module:

	import { CrystalGalleryModule } from 'ngx-crystal-gallery/components';

	@NgModule({
	    imports: [ CrystalGalleryModule ]
	});

## Usage
Default:

	myImages = [
		{
			preview: 'path_to_preview', 
			full: 'path_to_full_image' 
		}
	];

	myConfig = {
		loop: true
	};

	<crystal-gallery [images]="myImages" [config]="myConfig"></crystal-gallery>

Only overlay:

	import { CgOverlay } from 'ngx-crystal-gallery/components';

	constructor(private overlay: CgOverlay) {
	}

	myImages = [
		{
			path: 'path_to_image' 
		}
	];

	showOverlay(){
		this.overlay.open(myImages, myConfig);
	}

## Properties

| name             | type           | default            | description                                                                                            |
|------------------|----------------|--------------------|--------------------------------------------------------------------------------------------------------|
| masonry          | boolean        | true               | Masonry layout mode.                                                                                   |
| masonryMaxHeight | number         | 200                | Maximum height of the image in the grid.                                                               |
| masonryGutter    | number         | 3                  | Adds space between images.                                                                             |
| loop             | boolean        | false              | If false, will disable the ability to loop back to the beginning of the group when on the last element.|
| opacity          | number         | 0.85               | The overlay opacity level. Range: 0 to 1.                                                              |

## Methods

| name                 | description                              |
|----------------------|------------------------------------------|
| open(images, config) | Open the full image in the window.       |

## Demo
http://crystalui.org/components/gallery
