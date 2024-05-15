import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefViewComponent } from './chief-view.component';

describe('ChiefViewComponent', () => {
  let component: ChiefViewComponent;
  let fixture: ComponentFixture<ChiefViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiefViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiefViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
