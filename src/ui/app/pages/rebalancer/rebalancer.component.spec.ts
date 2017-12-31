import { TestBed } from '@angular/core/testing';

import { RebalancerComponent } from './rebalancer.component';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [RebalancerComponent]});
  });

  it ('should work', () => {
    let fixture = TestBed.createComponent(RebalancerComponent);
    expect(fixture.componentInstance instanceof RebalancerComponent).toBe(true, 'should create AppComponent');
  });
});
