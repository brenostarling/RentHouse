import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-user-popup',
  templateUrl: './new-user-popup.component.html',
  styleUrls: ['./new-user-popup.component.scss']
})
export class NewUserPopupComponent implements OnInit {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
  }
}
