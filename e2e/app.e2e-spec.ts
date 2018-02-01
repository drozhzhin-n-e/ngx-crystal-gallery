import { CuiGalleryAppPage } from './app.po';

describe('cui-gallery-app App', () => {
  let page: CuiGalleryAppPage;

  beforeEach(() => {
    page = new CuiGalleryAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
