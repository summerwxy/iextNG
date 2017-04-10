import { ExtNGPage } from './app.po';

describe('ext-ng App', () => {
  let page: ExtNGPage;

  beforeEach(() => {
    page = new ExtNGPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
