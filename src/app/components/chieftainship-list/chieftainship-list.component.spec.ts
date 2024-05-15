import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChieftainshipListComponent } from './chieftainship-list.component';

describe('ChieftainshipListComponent', () => {
  let component: ChieftainshipListComponent;
  let fixture: ComponentFixture<ChieftainshipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChieftainshipListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChieftainshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
