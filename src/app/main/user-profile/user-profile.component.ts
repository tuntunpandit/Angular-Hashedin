import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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
  submitted: boolean = false;
  interests: Array<{name: string, value: string}> = [
    { name: 'Designer', value: 'designer' },
    { name: 'Developer', value: 'developer' },
    { name: 'Project Manager', value: 'manager' },
    { name: 'Sales', value: 'ales' }
  ];
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;

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
      profession: ['', Validators.required],
      experience: ['', Validators.required],
      expertise: ['', Validators.required],
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
        interest: this.user.interest,
        profession: this.user.profession,
        experience: this.user.experience,
        expertise: this.user.expertise,
        role: this.user.role
      });
    })
  }

  get userFormControl() {
     return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(this.userForm.invalid) {
        return;
    }
    this.mainS.openModal(this.entry, "success", "User Data will be updated!").subscribe(v => { 
      this.mainS.saveUserData(this.userForm.value);
    });
  }

  onCheckboxChange(e) {
    
  }

}
