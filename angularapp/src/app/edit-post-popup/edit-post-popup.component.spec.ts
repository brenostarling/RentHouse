import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostPopupComponent } from './edit-post-popup.component';

describe('EditPostPopupComponent', () => {
  let component: EditPostPopupComponent;
  let fixture: ComponentFixture<EditPostPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPostPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
