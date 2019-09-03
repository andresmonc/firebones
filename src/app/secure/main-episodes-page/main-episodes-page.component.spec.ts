import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEpisodesPageComponent } from './main-episodes-page.component';

describe('MainEpisodesPageComponent', () => {
  let component: MainEpisodesPageComponent;
  let fixture: ComponentFixture<MainEpisodesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEpisodesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEpisodesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
