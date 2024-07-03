import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageheadLineageComponent } from './villagehead-lineage.component';

describe('VillageheadLineageComponent', () => {
  let component: VillageheadLineageComponent;
  let fixture: ComponentFixture<VillageheadLineageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillageheadLineageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VillageheadLineageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
