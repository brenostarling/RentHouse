import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NewUserPopupComponent } from '../new-user-popup/new-user-popup.component';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})

export class LoginPopupComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit () { }

  submitForm () {
    const login = this.loginForm.value;
    console.log(login);
  }

  openNewUserPopup () {
    const dialogRef = this.dialog.open(NewUserPopupComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado do popup:', result);
    });
  }
}
