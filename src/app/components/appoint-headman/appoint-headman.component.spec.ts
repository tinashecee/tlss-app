import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointHeadmanComponent } from './appoint-headman.component';

describe('AppointHeadmanComponent', () => {
  let component: AppointHeadmanComponent;
  let fixture: ComponentFixture<AppointHeadmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointHeadmanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointHeadmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
