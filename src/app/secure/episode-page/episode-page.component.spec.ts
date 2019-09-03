import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodePageComponent } from './episode-page.component';

describe('EpisodePageComponent', () => {
  let component: EpisodePageComponent;
  let fixture: ComponentFixture<EpisodePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
