import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { propertiesTypes, pets_const, furniture_const } from '../../utils/statics'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publish-popup',
  templateUrl: './publish-popup.component.html',
  styleUrls: ['./publish-popup.component.scss']
})
export class PublishPopupComponent implements OnInit {
  propertyForm!: FormGroup;
  propertyTypes = propertiesTypes;
  petOptions = pets_const;
  furnitureOptions = furniture_const;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit (): void {
    this.initForm();
  }

  initForm (): void {
    this.propertyForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: [''],
      totalArea: [''],
      bedrooms: [''],
      bathrooms: [''],
      carGarage: [''],
      pets: [''],
      rent: [false],
      furniture: [''],
      price: [''],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      complement: [''],
      description: ['']
    });
  }

  submitForm (): void {
    console.log(this.propertyForm.value);
  }

  async searchAddress () {
    const cep = this.propertyForm.get('zipcode')?.value;
    if (cep) {
      try {
        const data = await this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).toPromise();
        if (!data.erro) {
          this.propertyForm.patchValue({
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          });
        } else {
          console.log('CEP inválido');
        }
      } catch (error) {
        console.log('Erro ao buscar o endereço:', error);
      }
    }
  }
}
