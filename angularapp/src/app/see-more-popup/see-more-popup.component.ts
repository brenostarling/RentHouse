import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ContactPopupComponent } from '../contact-popup/contact-popup.component'

@Component({
  selector: 'app-see-more-popup',
  templateUrl: './see-more-popup.component.html',
  styleUrls: ['./see-more-popup.component.scss']
})

export class SeeMorePopupComponent implements OnInit {
  house: any;
  currentPhotoIndex!: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

  ngOnInit (): void {
    this.house = this.data.house;
    this.currentPhotoIndex = this.getInitialPhotoIndex();
    console.log('Propriedade recebida:', this.house);
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

  getInitialPhotoIndex (): number {
    if (this.house.photos && this.house.photos.length > 0) {
      const thumbnailPhotoIndex = this.house.photos.findIndex((photo: any) => photo.thumbnail);
      return thumbnailPhotoIndex !== -1 ? thumbnailPhotoIndex : 0;
    }
    return 0;
  }

  nextPhoto (): void {
    if (this.house.photos && this.house.photos.length > 1) {
      if (this.currentPhotoIndex === this.house.photos.length - 1) {
        this.currentPhotoIndex = 0;
      } else {
        this.currentPhotoIndex++;
      }
    }
  }

  previousPhoto (): void {
    if (this.house.photos && this.house.photos.length > 1) {
      if (this.currentPhotoIndex === 0) {
        this.currentPhotoIndex = this.house.photos.length - 1;
      } else {
        this.currentPhotoIndex--;
      }
    }
  }

}

