import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { propertiesTypes, quantity, pets_const, furniture_const } from '../utils/statics';
import { properties } from '../utils/dadosMock';
import { PublishPopupComponent } from './publish-popup/publish-popup.component';
import { NewUserPopupComponent } from './new-user-popup/new-user-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'RentHouse';

  formGroup!: FormGroup;
  types!: FormControl;
  typeList!: string[];

  bedrooms!: FormControl;
  bedroomsList!: string[];

  bathrooms!: FormControl;
  bathroomsList!: string[];

  carParks!: FormControl;
  carParksList!: string[];

  furniture!: FormControl;
  furnitureList!: string[];

  pets!: FormControl;
  petsList!: string[];

  minprice!: FormControl;
  maxprice!: FormControl;
  value!: FormControl;
  zipcode!: FormControl;
  street!: FormControl;
  neighborhood!: FormControl;
  city!: FormControl;
  state!: FormControl;

  properties: any[] = properties;
  constructor(private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit () {
    this.types = new FormControl();
    this.typeList = propertiesTypes.map(type => type.label);

    this.bedrooms = new FormControl();
    this.bedroomsList = quantity.map(type => type.label) as string[];

    this.bathrooms = new FormControl();
    this.bathroomsList = quantity.map(type => type.label) as string[];

    this.carParks = new FormControl();
    this.carParksList = quantity.map(type => type.label) as string[];

    this.furniture = new FormControl();
    this.furnitureList = furniture_const.map(type => type.label);

    this.pets = new FormControl();
    this.petsList = pets_const.map(type => type.label);

    this.maxprice = new FormControl();
    this.minprice = new FormControl();

    this.zipcode = new FormControl();
    this.street = new FormControl();
    this.neighborhood = new FormControl();
    this.city = new FormControl();
    this.state = new FormControl();

    this.formGroup = new FormGroup({
      types: this.types,
      maxprice: this.maxprice,
      minprice: this.minprice,
      bedrooms: this.bedrooms,
      bathrooms: this.bathrooms,
      carParks: this.carParks,
      furniture: this.furniture,
      pets: this.pets,
      zipcode: this.zipcode,
      street: this.street,
      neighborhood: this.neighborhood,
      city: this.city,
      state: this.state
    });
  }

  formatLabel (value: number) {
    const format = `${value.toFixed(2).replace('.', ',')}`;
    return format;
  }

  getSelectedTypes () {
    return this.types.value;
  }

  getThumbnailPath (house: any): string | undefined {
    const thumbnailPhoto = house.photos.find((photo: any) => photo.thumbnail);
    return thumbnailPhoto?.path;
  }

  getAddress (house: any): string | undefined {
    let Address = `${house.street}, ${house.number} - ${house.neighborhood}, ${house.city} - ${house.state}, ${house.zipcode}`
    if (house.complement) Address += ` - (${house.complement})`
    return Address;
  }

  openPublishPopup () {
    const dialogRef = this.dialog.open(PublishPopupComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado do popup:', result);
    });
  }
  openNewUserPopup () {
    const dialogRef = this.dialog.open(NewUserPopupComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado do popup:', result);
    });
  }

  async searchAddress () {
    const cep = this.formGroup.get('zipcode')?.value;
    if (cep) {
      try {
        const data = await this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).toPromise();
        if (!data.erro) {
          this.formGroup.patchValue({
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
