import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlytBoxesComponent } from './flyt-boxes.component';

describe('FlytBoxesComponent', () => {
  let component: FlytBoxesComponent;
  let fixture: ComponentFixture<FlytBoxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlytBoxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlytBoxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
