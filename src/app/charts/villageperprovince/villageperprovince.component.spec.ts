import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageperprovinceComponent } from './villageperprovince.component';

describe('VillageperprovinceComponent', () => {
  let component: VillageperprovinceComponent;
  let fixture: ComponentFixture<VillageperprovinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillageperprovinceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VillageperprovinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
