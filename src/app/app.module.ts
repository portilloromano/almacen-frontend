import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

import { IdentityGuardService } from './services/identity-guard.service';
import { IdentityAdminGuardService } from './services/identity-admin-guard.service';
import { UserService } from './services/user.service';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserShowComponent } from './components/user-show/user-show.component';
import { ProviderCreateComponent } from './components/provider-create/provider-create.component';
import { ProviderEditComponent } from './components/provider-edit/provider-edit.component';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { ProviderShowComponent } from './components/provider-show/provider-show.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryShowComponent } from './components/category-show/category-show.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductShowComponent } from './components/product-show/product-show.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MovementCreateComponent } from './components/movement-create/movement-create.component';
import { MovementListComponent } from './components/movement-list/movement-list.component';
import { MovementShowComponent } from './components/movement-show/movement-show.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    UserShowComponent,
    ProviderCreateComponent,
    ProviderEditComponent,
    ProviderListComponent,
    ProviderShowComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    CategoryListComponent,
    CategoryShowComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductListComponent,
    ProductShowComponent,
    MovementCreateComponent,
    MovementListComponent,
    MovementShowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PaginationModule.forRoot()
  ],
  providers: [
    IdentityGuardService,
    IdentityAdminGuardService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
