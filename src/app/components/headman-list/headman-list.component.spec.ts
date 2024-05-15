import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadmanListComponent } from './headman-list.component';

describe('HeadmanListComponent', () => {
  let component: HeadmanListComponent;
  let fixture: ComponentFixture<HeadmanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadmanListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeadmanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
