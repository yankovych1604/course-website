import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCertificatesComponent } from './account-certificates.component';

describe('AccountCertificatesComponent', () => {
  let component: AccountCertificatesComponent;
  let fixture: ComponentFixture<AccountCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCertificatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
