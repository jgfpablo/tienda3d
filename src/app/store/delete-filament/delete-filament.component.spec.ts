import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFilamentComponent } from './delete-filament.component';

describe('DeleteFilamentComponent', () => {
  let component: DeleteFilamentComponent;
  let fixture: ComponentFixture<DeleteFilamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteFilamentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteFilamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
