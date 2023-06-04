import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  captionControls: FormControl[] = [];

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
      photos: this.formBuilder.array([]) // Adicionado array para as fotos
    });

    this.photosFormArray.valueChanges.subscribe(() => {
      this.updateCaptionControls();
    });
  }

  get photosFormArray (): FormArray {
    return this.propertyForm.get('photos') as FormArray;
  }

  updateCaptionControls (): void {
    const photosLength = this.photosFormArray.length;
    const captionsLength = this.captionControls.length;

    if (photosLength > captionsLength) {
      for (let i = captionsLength; i < photosLength; i++) {
        this.captionControls.push(this.formBuilder.control(''));
      }
    } else if (photosLength < captionsLength) {
      for (let i = captionsLength - 1; i >= photosLength; i--) {
        this.captionControls[i].reset();
        this.captionControls.splice(i, 1);
      }
    }
  }

  getCaptionControl (index: number): FormControl {
    return this.captionControls[index];
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
