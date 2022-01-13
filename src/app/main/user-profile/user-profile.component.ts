import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { MainService } from '../main.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: User;
  userForm: FormGroup;
  constructor(
    private mainS: MainService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      about: ['', Validators.required],
      interest: ['', Validators.required],
      role: ['', Validators.required]
    });
    this.mainS.getUserProfileData().subscribe(data => {
      this.user = data;
      console.log("User", this.user);
      this.userForm.patchValue({
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        about: this.user.about,
        interest: this.user.about,
        role: this.user.role
      });
    })
  }

  onSubmit() {

  }

}
