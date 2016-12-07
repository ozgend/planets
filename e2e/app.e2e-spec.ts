import { PlanetsAppPage } from './app.po';

describe('planets-app App', function() {
  let page: PlanetsAppPage;

  beforeEach(() => {
    page = new PlanetsAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
