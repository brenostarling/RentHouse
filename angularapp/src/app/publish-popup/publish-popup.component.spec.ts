import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPopupComponent } from './publish-popup.component';

describe('PublishPopupComponent', () => {
  let component: PublishPopupComponent;
  let fixture: ComponentFixture<PublishPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
