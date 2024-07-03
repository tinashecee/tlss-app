import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointChiefComponent } from './appoint-chief.component';

describe('AppointChiefComponent', () => {
  let component: AppointChiefComponent;
  let fixture: ComponentFixture<AppointChiefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointChiefComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointChiefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
