import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmanshipListComponent } from './headmanship-list.component';

describe('HeadmanshipListComponent', () => {
  let component: HeadmanshipListComponent;
  let fixture: ComponentFixture<HeadmanshipListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadmanshipListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadmanshipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
