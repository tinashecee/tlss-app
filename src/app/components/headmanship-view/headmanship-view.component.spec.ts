import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmanshipViewComponent } from './headmanship-view.component';

describe('HeadmanshipViewComponent', () => {
  let component: HeadmanshipViewComponent;
  let fixture: ComponentFixture<HeadmanshipViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadmanshipViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadmanshipViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
