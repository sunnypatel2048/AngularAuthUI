import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  hideShowPass(): void {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"
    this.isText ? this. type = "text" : this.type = "password"
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value)
      .subscribe({
        next: (res) => {
          alert(res.message)
          this.signUpForm.reset();
          this.router.navigate(['login'])
        },
        error: (err) => {
          alert(err?.error.message)
        }
      })
      console.log(this.signUpForm.value)
    }
    else {
      // throw error
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Form is invalid");
    }
  }
}
