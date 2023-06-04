import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { propertiesTypes, pets_const, furniture_const } from '../../utils/statics'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-post-popup',
  templateUrl: './edit-post-popup.component.html',
  styleUrls: ['./edit-post-popup.component.scss']
})
export class EditPostPopupComponent implements OnInit {
  propertyForm!: FormGroup;
  propertyTypes = propertiesTypes;
  petOptions = pets_const;
  furnitureOptions = furniture_const;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

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
      description: [''],
    });
  }

  get photosFormArray (): FormArray {
    return this.propertyForm.get('photos') as FormArray;
  }

  getCaptionControl (index: number): FormControl {
    return this.photosFormArray.at(index).get('caption') as FormControl;
  }

  getSafeUrl (url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onFileSelected (event: any): void {
    const files = event.target.files;
    for (const file of files) {
      this.photosFormArray.push(
        this.formBuilder.group({
          file: [file],
          url: [URL.createObjectURL(file)],
          caption: ['']
        })
      );
    }
    console.log(this.photosFormArray);
  }

  submitForm (): void {
    console.log(this.propertyForm.value);
  }

  async searchAddress (): Promise<void> {
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
