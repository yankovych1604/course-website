import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReviewsComponent } from './account-reviews.component';

describe('AccountReviewsComponent', () => {
  let component: AccountReviewsComponent;
  let fixture: ComponentFixture<AccountReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
