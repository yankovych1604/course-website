import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursespageCardComponent } from './coursespage-card.component';

describe('CoursespageCardComponent', () => {
  let component: CoursespageCardComponent;
  let fixture: ComponentFixture<CoursespageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursespageCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursespageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
