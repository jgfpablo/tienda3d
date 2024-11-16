import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFilamentComponent } from './update-filament.component';

describe('UpdateFilamentComponent', () => {
  let component: UpdateFilamentComponent;
  let fixture: ComponentFixture<UpdateFilamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateFilamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFilamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
