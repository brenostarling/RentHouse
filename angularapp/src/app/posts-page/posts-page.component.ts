import { Component, OnInit } from '@angular/core';
import { properties } from '../../utils/dadosMock';
import { MatDialog } from '@angular/material/dialog';
import { ContactPopupComponent } from '../contact-popup/contact-popup.component'

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {

  properties: any[] = properties;
  constructor(private dialog: MatDialog) { }

  ngOnInit (): void {
  }

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

  openContactPopup () {
    const dialogRef = this.dialog.open(ContactPopupComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado do popup:', result);
    });
  }

}
