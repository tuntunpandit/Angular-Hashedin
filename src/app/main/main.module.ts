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
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { SharedModule } from '../shared/shared.module';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {
      breadcrumb: 'Home',
    },
    children: [
      {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full',
      },
      {
        path: 'courses',
        component: CoursesComponent,
        // data: {
        //   breadcrumb: 'Courses',
        // }
      },
      {
        path: 'courses/:id',
        component: CourseDetailsComponent,
        data: {
          breadcrumb: 'Course Detail',
        }
      },
      {
        path: 'cart',
        component: CartComponent,
        data: {
          breadcrumb: 'Cart',
        }
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        data: {
          breadcrumb: 'Wishlist',
        }
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        data: {
          breadcrumb: 'Profile',
        }
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
    CourseDetailsComponent,
    CartDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(mainRoutes),
    SharedModule
  ],
  providers: [
    MainService
  ]
})
export class MainModule { }
