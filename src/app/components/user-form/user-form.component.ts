import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Output() emitData = new EventEmitter();

  userAndPassword = {
    username: '',
    password: '',
  };

  sendData() {
    this.emitData.emit(this.userAndPassword);
  }
}
