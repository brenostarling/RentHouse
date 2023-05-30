import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { properties } from '../utils/dadosMock';
import { PublishPopupComponent } from './publish-popup/publish-popup.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { MenuFiltersComponent } from './menu-filters/menu-filters.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'RentHouse';

  properties: any[] = properties;

  constructor(private dialog: MatDialog) { }


  ngOnInit (): void { }

  formatLabel (value: number) {
    const format = `${value.toFixed(2).replace('.', ',')}`;
    return format;
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

  openLoginPopup () {
    const dialogRef = this.dialog.open(LoginPopupComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado do popup:', result);
    });
  }
}
