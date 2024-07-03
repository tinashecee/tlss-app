import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmanLineageComponent } from './headman-lineage.component';

describe('HeadmanLineageComponent', () => {
  let component: HeadmanLineageComponent;
  let fixture: ComponentFixture<HeadmanLineageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadmanLineageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadmanLineageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
