import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFilamentsComponent } from './form-filaments.component';

describe('FormFilamentsComponent', () => {
  let component: FormFilamentsComponent;
  let fixture: ComponentFixture<FormFilamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFilamentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormFilamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
