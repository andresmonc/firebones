import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalMessageModalComponentComponent } from './global-message-modal-component.component';

describe('GlobalMessageModalComponentComponent', () => {
  let component: GlobalMessageModalComponentComponent;
  let fixture: ComponentFixture<GlobalMessageModalComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalMessageModalComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalMessageModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
