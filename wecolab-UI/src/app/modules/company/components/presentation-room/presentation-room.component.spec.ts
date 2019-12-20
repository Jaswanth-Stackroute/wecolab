import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationRoomComponent } from './presentation-room.component';

describe('PresentationRoomComponent', () => {
  let component: PresentationRoomComponent;
  let fixture: ComponentFixture<PresentationRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
