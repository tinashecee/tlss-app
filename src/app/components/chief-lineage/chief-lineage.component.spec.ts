import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefLineageComponent } from './chief-lineage.component';

describe('ChiefLineageComponent', () => {
  let component: ChiefLineageComponent;
  let fixture: ComponentFixture<ChiefLineageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiefLineageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiefLineageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
