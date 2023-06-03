import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { PublishPopupComponent } from './publish-popup/publish-popup.component';
import { NewUserPopupComponent } from './new-user-popup/new-user-popup.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { MenuFiltersComponent } from './menu-filters/menu-filters.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { NavHeaderComponent } from './nav-header/nav-header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { EditPostPopupComponent } from './edit-post-popup/edit-post-popup.component';
import { ContactPopupComponent } from './contact-popup/contact-popup.component';
// import { SeeMorePopupComponent } from './see-more-popup/see-more-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    PublishPopupComponent,
    NewUserPopupComponent,
    LoginPopupComponent,
    MenuFiltersComponent,
    PostsPageComponent,
    NavHeaderComponent,
    UserProfileComponent,
    MyPostsComponent,
    EditPostPopupComponent,
    ContactPopupComponent,
    // SeeMorePopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
