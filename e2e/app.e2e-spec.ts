import { OblvAppPage } from './app.po';

describe('oblv-app App', function() {
  let page: OblvAppPage;

  beforeEach(() => {
    page = new OblvAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
