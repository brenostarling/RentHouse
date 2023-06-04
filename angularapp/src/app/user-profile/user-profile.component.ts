import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      email: '',
      password: '',
      newPassword: '',
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
