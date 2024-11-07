import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @Input() AlertStatus: boolean = false; //es activo si se muestra el alert
  @Input() typeAlert: string = ''; // es el tipo de alert  a desencadenar
  @Input() mensaje: string = '';
  @Input() buttonText: string = '';
  @Input() url: string = '';
  @Output() cleanForm = new EventEmitter<void>();

  clean() {
    this.cleanForm.emit();
  }

  switchStatus() {
    this.clean();
    this.AlertStatus = false;
  }
}
