import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointVillageheadComponent } from './appoint-villagehead.component';

describe('AppointVillageheadComponent', () => {
  let component: AppointVillageheadComponent;
  let fixture: ComponentFixture<AppointVillageheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointVillageheadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointVillageheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
