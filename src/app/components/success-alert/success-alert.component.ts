import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-alert',
  templateUrl: './success-alert.component.html',
  styleUrl: './success-alert.component.scss',
})
export class SuccessAlertComponent {
  @Input() successAlertStatus: boolean = false;
  @Input() mensaje: string = '';
  @Input() url: string = '';
  @Input() buttonText: string = '';
}
