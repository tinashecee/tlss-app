import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChieftainshipViewComponent } from './chieftainship-view.component';

describe('ChieftainshipViewComponent', () => {
  let component: ChieftainshipViewComponent;
  let fixture: ComponentFixture<ChieftainshipViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChieftainshipViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChieftainshipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
