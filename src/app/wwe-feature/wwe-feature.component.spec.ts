import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WweFeatureComponent } from './wwe-feature.component';

describe('WweFeatureComponent', () => {
  let component: WweFeatureComponent;
  let fixture: ComponentFixture<WweFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WweFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WweFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
