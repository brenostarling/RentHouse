import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMorePopupComponent } from './see-more-popup.component';

describe('SeeMorePopupComponent', () => {
  let component: SeeMorePopupComponent;
  let fixture: ComponentFixture<SeeMorePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeMorePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeMorePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
