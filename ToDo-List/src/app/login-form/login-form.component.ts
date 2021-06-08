import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/api/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less']
})
export class LoginFormComponent implements OnInit {

  hide = true;
  loginFormInstance: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.loginFormInstance = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onLogin(){
    if(this.loginFormInstance.invalid){
      return;
    }
    this.authService.login({email: this.email.value, password: this.password.value}).subscribe(response => {
      console.log(response)
    })
  }

  get email(){
    return this.loginFormInstance.get("email");
  }

  get password(){
    return this.loginFormInstance.get("password");
  }
}
