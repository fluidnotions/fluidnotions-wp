import { FluidnotionsWpPage } from './app.po';

describe('fluidnotions-wp App', () => {
  let page: FluidnotionsWpPage;

  beforeEach(() => {
    page = new FluidnotionsWpPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
