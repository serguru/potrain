import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreflopComponent } from './preflop.component';

describe('PreflopComponent', () => {
  let component: PreflopComponent;
  let fixture: ComponentFixture<PreflopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreflopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreflopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
