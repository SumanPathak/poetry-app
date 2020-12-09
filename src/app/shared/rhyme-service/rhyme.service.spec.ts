import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { RhymeService } from './rhyme.service';

const httpStub = {

};

const rhymeServiceStub = {

};

describe('RhymeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: RhymeService, useValue: rhymeServiceStub }, { provide: HttpClient, useValue: httpStub }]
    });
  });

  it('should ...', inject([RhymeService], (service: RhymeService) => {
    expect(service).toBeTruthy();
  }));
});


