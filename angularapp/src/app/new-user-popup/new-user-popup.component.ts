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

    this.http.get(`${this.apiUrl}/Users`).subscribe(
      (response) => {
        console.log('Lista de usuários:', response);
      },
      (error) => {
        console.error('Erro ao obter a lista de usuários:', error);
      }
    );
  }


}
