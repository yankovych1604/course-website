import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProgressBarComponent } from './account-progress-bar.component';

describe('AccountProgressBarComponent', () => {
  let component: AccountProgressBarComponent;
  let fixture: ComponentFixture<AccountProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
