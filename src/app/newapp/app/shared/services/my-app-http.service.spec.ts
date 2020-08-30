import { TestBed } from '@angular/core/testing';

import { MyAppHttpService } from './my-app-http.service';

describe('MyAppHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyAppHttpService = TestBed.get(MyAppHttpService);
    expect(service).toBeTruthy();
  });
});
