# Gallery for Angular 2

Responsive gallery with support for masonry layout and lightbox.

## Installation

Install the npm package:

    npm i ngx-crystal-gallery --save
        
Import module:

	import { CrystalGalleryModule } from 'ngx-crystal-gallery';

	@NgModule({
	  imports: [ CrystalGalleryModule ]
	});

## Usage
By default, the gallery is displayed as masonry grid layout allowing you to open an enlarged image in the lightbox.

	myImages = [
	  {
	    preview: 'path_to_preview',
	    full: 'path_to_full_image',
	    width: natural_width, // used for masonry
	    height: natural_height // used for masonry
	    description: 'description of the image' // optional property
	  },
	  ...
	];

	myConfig = {
	  ...
	};

	<crystal-gallery [images]="myImages" [config]="myConfig"></crystal-gallery>

You can also use a lightbox separately.

	import { CrystalLightbox } from 'ngx-crystal-gallery';

	constructor(lightbox: CrystalLightbox) {}

	myImages = [
	  {
	    path: 'path_to_image'
	  },
	  ...
	];

	<button (click)="lightbox.open(myImages)">Show the photo of road</button>
	<button (click)="lightbox.open(myImages, {index: 1})">Show the photo of forest</button>
	<button (click)="lightbox.open([{path: 'path_to_image'}])">Show the photo of hill</button>

## Properties

| name             | type           | default            | description                            |
|------------------|----------------|--------------------|----------------------------------------|
| masonry          | boolean        | true               | Masonry layout mode.                   |
| masonryMaxHeight | number         | 200                | Maximum height of the image in the grid. |
| masonryGutter    | number         | 4                  | Adds space between images (it is recommended to use even numbers). |
| loop             | boolean        | false              | If false, will disable the ability to loop back to the beginning of the group when on the last element. |
| backgroundOpacity | number         | 0.85               | Opacity level of lightbox background. Range: 0 to 1. |
| counter          | boolean        | false              | Image count in lightbox.               |
| animationDuration | number        | 100                | Duration of animation to open and close the lightbox. |
| lightboxMaxHeight | string        | 100%               | Maximum lightbox image height. You can specify a complex value, for example: 100% + 100px * 2. |
| lightboxMaxWidth  | string        | 100%               | Maximum lightbox image width. You can set a complex value, similar to lightboxMaxHeight. |

## Methods

| name                 | description                              |
|----------------------|------------------------------------------|
| open(images, config) | Open full image in lightbox.             |

## Demo
http://crystalui.org/components/gallery

## Sponsors

We use Browserstack for cross-browser testing.

[![Browserstack](http://crystalui.org/assets/img/browserstack-logo.png)](http://browserstack.com/)
