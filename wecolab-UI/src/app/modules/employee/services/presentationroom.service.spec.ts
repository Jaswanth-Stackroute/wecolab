import { TestBed } from '@angular/core/testing';

import { PresentationroomService } from './presentationroom.service';

describe('PresentationroomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PresentationroomService = TestBed.get(PresentationroomService);
    expect(service).toBeTruthy();
  });
});
