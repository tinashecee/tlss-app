import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageViewComponent } from './village-view.component';

describe('VillageViewComponent', () => {
  let component: VillageViewComponent;
  let fixture: ComponentFixture<VillageViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillageViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VillageViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
