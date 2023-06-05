import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NewUserPopupComponent } from '../new-user-popup/new-user-popup.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})

export class LoginPopupComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  loginForm: FormGroup;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder, private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  ngOnInit () { }

  submitForm () {
    const login = this.loginForm.value;

    this.http.post(`${this.apiUrl}/Users/login`, login).subscribe(
      (response: any) => {
        console.log('Usuário logado:', response);

        // Adicionar usuário ao localStorage
        localStorage.setItem('currentUser', JSON.stringify(response));
      },
      (error) => {
        console.error('Usuário ou senha incorreto:', error);
      }
    );
  }

  openNewUserPopup () {
    const dialogRef = this.dialog.open(NewUserPopupComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado do popup:', result);
    });
  }
}
