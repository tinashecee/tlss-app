import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageheadListComponent } from './villagehead-list.component';

describe('VillageheadListComponent', () => {
  let component: VillageheadListComponent;
  let fixture: ComponentFixture<VillageheadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillageheadListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VillageheadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
