import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseBenefitsComponent } from './course-benefits.component';

describe('CourseBenefitsComponent', () => {
  let component: CourseBenefitsComponent;
  let fixture: ComponentFixture<CourseBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseBenefitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
