import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MainService } from './main.service';
// components
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { MainComponent } from './main.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'courses/:id',
        component: CourseDetailsComponent
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      }
    ]
  }
]

@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    CartComponent,
    WishlistComponent,
    UserProfileComponent,
    CoursesComponent,
    CourseDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers: [
    MainService
  ]
})
export class MainModule { }
