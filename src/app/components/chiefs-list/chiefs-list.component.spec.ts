import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiefsListComponent } from './chiefs-list.component';

describe('ChiefsListComponent', () => {
  let component: ChiefsListComponent;
  let fixture: ComponentFixture<ChiefsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiefsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChiefsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
