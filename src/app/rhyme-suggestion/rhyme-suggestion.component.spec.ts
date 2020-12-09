import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RhymeSuggestionComponent } from './rhyme-suggestion.component';

describe('RhymeSuggestionComponent', () => {
  let component: RhymeSuggestionComponent;
  let fixture: ComponentFixture<RhymeSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [RhymeSuggestionComponent],
      providers: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhymeSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the rhyme list when not loading and hide it when it is loading', () => {
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#rhyme-list'))
    expect(element).toBeTruthy();

    fixture.detectChanges();

    element = fixture.debugElement.query(By.css('#rhyme-list'))
    expect(element).toBeFalsy();
  });

  it('should give the user feedback when loading rhymes', () => {
    component.searchText = "test";
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#loading-rhymes'))
    expect(element).toBeTruthy();
  });

  it('should give the user feedback when no rhymes are found', () => {
    component.searchText = "test"
    component.rhymeHints = [];
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#no-rhymes-found'))
    expect(element).toBeTruthy();
  });

  it('should give the user feedback when rhymes are found', () => {
    component.searchText = "test"
    component.rhymeHints = ["best"];
    fixture.detectChanges();

    let element = fixture.debugElement.query(By.css('#rhymes-found'))
    expect(element).toBeTruthy();
  });

});
