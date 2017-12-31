import { TestBed } from '@angular/core/testing';

import { ScreenerComponent } from './screener.component';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ScreenerComponent]});
  });

  it ('should work', () => {
    let fixture = TestBed.createComponent(ScreenerComponent);
    expect(fixture.componentInstance instanceof ScreenerComponent).toBe(true, 'should create AppComponent');
  });
});
