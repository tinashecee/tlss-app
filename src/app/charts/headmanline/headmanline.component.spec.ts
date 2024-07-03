import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmanlineComponent } from './headmanline.component';

describe('HeadmanlineComponent', () => {
  let component: HeadmanlineComponent;
  let fixture: ComponentFixture<HeadmanlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadmanlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadmanlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
