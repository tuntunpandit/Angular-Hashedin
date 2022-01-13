import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _authS: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this._authS.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        this.router.navigate(['list']);
      },
        error => {
          console.log(error);
          this.loading = false;
        });
  }
}
