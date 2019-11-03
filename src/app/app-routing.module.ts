import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentityGuardService } from './services/identity-guard.service';
import { IdentityAdminGuardService } from './services/identity-admin-guard.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ErrorComponent } from './components/error/error.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserShowComponent } from './components/user-show/user-show.component';
import { ProviderListComponent } from './components/provider-list/provider-list.component';
import { ProviderCreateComponent } from './components/provider-create/provider-create.component';
import { ProviderEditComponent } from './components/provider-edit/provider-edit.component';
import { ProviderShowComponent } from './components/provider-show/provider-show.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryShowComponent } from './components/category-show/category-show.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductShowComponent } from './components/product-show/product-show.component';
import { MovementCreateComponent } from './components/movement-create/movement-create.component';
import { MovementListComponent } from './components/movement-list/movement-list.component';
import { MovementShowComponent } from './components/movement-show/movement-show.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout/:sure', component: LoginComponent },
  { path: 'user', component: UserListComponent, canActivate: [IdentityGuardService] },
  { path: 'user/create', component: UserCreateComponent, canActivate: [IdentityGuardService] },
  { path: 'user/edit', component: UserEditComponent, canActivate: [IdentityGuardService] },
  { path: 'user/edit/:id', component: UserEditComponent, canActivate: [IdentityGuardService] },
  { path: 'user/show/:id', component: UserShowComponent, canActivate: [IdentityGuardService] },
  { path: 'provider', component: ProviderListComponent, canActivate: [IdentityGuardService] },
  { path: 'provider/create', component: ProviderCreateComponent, canActivate: [IdentityGuardService] },
  { path: 'provider/edit/:id', component: ProviderEditComponent, canActivate: [IdentityGuardService] },
  { path: 'provider/show/:id', component: ProviderShowComponent, canActivate: [IdentityGuardService] },
  { path: 'category', component: CategoryListComponent, canActivate: [IdentityGuardService] },
  { path: 'category/create', component: CategoryCreateComponent, canActivate: [IdentityGuardService] },
  { path: 'category/edit/:id', component: CategoryEditComponent, canActivate: [IdentityGuardService] },
  { path: 'category/show/:id', component: CategoryShowComponent, canActivate: [IdentityGuardService] },
  { path: 'product', component: ProductListComponent, canActivate: [IdentityGuardService] },
  { path: 'product/create', component: ProductCreateComponent, canActivate: [IdentityGuardService] },
  { path: 'product/edit/:id', component: ProductEditComponent, canActivate: [IdentityGuardService] },
  { path: 'product/show/:id', component: ProductShowComponent, canActivate: [IdentityGuardService] },
  { path: 'movement', component: MovementListComponent, canActivate: [IdentityGuardService] },
  { path: 'movement/create', component: MovementCreateComponent, canActivate: [IdentityGuardService] },
  { path: 'movement/show/:id', component: MovementShowComponent, canActivate: [IdentityGuardService] },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
