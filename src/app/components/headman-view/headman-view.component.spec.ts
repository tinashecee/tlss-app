import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmanViewComponent } from './headman-view.component';

describe('HeadmanViewComponent', () => {
  let component: HeadmanViewComponent;
  let fixture: ComponentFixture<HeadmanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadmanViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadmanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
