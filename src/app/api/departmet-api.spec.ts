import { TestBed } from '@angular/core/testing';
import { DepartmetApi } from './departmet-api';

describe('DepartmetApi', () => {
  let service: DepartmetApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmetApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
