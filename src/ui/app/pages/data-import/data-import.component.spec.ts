import { TestBed } from '@angular/core/testing';

import { DataImportComponent } from './data-import.component';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [DataImportComponent]});
  });

  it ('should work', () => {
    let fixture = TestBed.createComponent(DataImportComponent);
    expect(fixture.componentInstance instanceof DataImportComponent).toBe(true, 'should create AppComponent');
  });
});
