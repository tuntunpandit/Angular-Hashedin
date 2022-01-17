import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ModalComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  // entryComponents: [
  //   ModalComponent
  // ],
  exports: [
    ModalComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule { }
