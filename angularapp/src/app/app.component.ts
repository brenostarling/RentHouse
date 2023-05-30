import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PublishPopupComponent } from './publish-popup/publish-popup.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'RentHouse';

  constructor(private dialog: MatDialog) { }

  ngOnInit (): void { }

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
