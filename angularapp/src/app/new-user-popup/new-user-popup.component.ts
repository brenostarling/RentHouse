import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-user-popup',
  templateUrl: './new-user-popup.component.html',
  styleUrls: ['./new-user-popup.component.scss']
})
export class NewUserPopupComponent implements OnInit {
  private apiUrl = environment.apiUrl;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      email: '',
      password: '',
      cpf: '',
      cnpj: '',
      phone: '',
      fullname: ''
    });
  }

  ngOnInit () { }

  submitForm () {
    const user = this.userForm.value;
    console.log(user);

    this.http.post(`${this.apiUrl}/Users`, user).subscribe(
      (response) => {
        console.log('Usuário criado:', response);
        // Adicionar usuário ao localStorage
        localStorage.setItem('currentUser', JSON.stringify(response));
      },
      (error) => {
        console.error('Erro ao criar usuário:', error);
      }
    );
  }
}
