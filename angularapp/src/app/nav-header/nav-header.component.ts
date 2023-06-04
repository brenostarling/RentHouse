import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PublishPopupComponent } from '../publish-popup/publish-popup.component';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  title = 'RentHouse';
  login = true;

  constructor(private dialog: MatDialog) { }

  ngOnInit (): void {
  }

  @Output() toggleDrawer: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleMyPosts: EventEmitter<boolean> = new EventEmitter<boolean>();

  logoff () {
    this.login = false;
    this.toggleMyPosts.emit(false);
  }

  handleMyPostsClick () {
    this.toggleMyPosts.emit(true);
  }

  onToggleDrawer () {
    this.toggleDrawer.emit();
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

  openUserProfile () {
    const dialogRef = this.dialog.open(UserProfileComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Resultado do popup:', result);
    });
  }
}
