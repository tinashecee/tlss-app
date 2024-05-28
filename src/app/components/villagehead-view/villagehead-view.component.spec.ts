import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageheadViewComponent } from './villagehead-view.component';

describe('VillageheadViewComponent', () => {
  let component: VillageheadViewComponent;
  let fixture: ComponentFixture<VillageheadViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillageheadViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VillageheadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
