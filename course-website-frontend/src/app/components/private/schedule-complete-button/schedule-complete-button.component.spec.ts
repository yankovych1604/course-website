import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCompleteButtonComponent } from './schedule-complete-button.component';

describe('ScheduleCompleteButtonComponent', () => {
  let component: ScheduleCompleteButtonComponent;
  let fixture: ComponentFixture<ScheduleCompleteButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleCompleteButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleCompleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
