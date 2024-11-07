import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.scss',
})
export class ErrorAlertComponent {
  @Input() errorAlertStatus: boolean = false;
  @Input() mensaje: string = '';
  @Input() url: string = '';
  @Input() buttonText: string = '';

  switchStatus() {
    this.errorAlertStatus = false;
  }
}
