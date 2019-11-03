import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementShowComponent } from './movement-show.component';

describe('MovementShowComponent', () => {
  let component: MovementShowComponent;
  let fixture: ComponentFixture<MovementShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
