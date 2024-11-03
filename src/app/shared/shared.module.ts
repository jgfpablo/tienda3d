import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, RouterModule, ComponentsModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
