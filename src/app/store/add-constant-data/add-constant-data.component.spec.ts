import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConstantDataComponent } from './add-constant-data.component';

describe('AddConstantDataComponent', () => {
  let component: AddConstantDataComponent;
  let fixture: ComponentFixture<AddConstantDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddConstantDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddConstantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
