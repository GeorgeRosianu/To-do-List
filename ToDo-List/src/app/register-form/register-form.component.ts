import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomValidators } from '../core/helpers/custom-validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.less']
})
export class RegisterFormComponent implements OnInit {

  hide = true;
  registerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegisterFormComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.compose(
        [Validators.required, 
         Validators.maxLength(20)])],
      lastName: ['', Validators.compose(
        [Validators.required, 
         Validators.maxLength(20)])],
      password: ['', 
      {
        validators: [
          Validators.compose([
            Validators.required, 
            Validators.minLength(6), 
            Validators.maxLength(20),
            CustomValidators.passwordStrength()
          ])
        ],
        updateOn: 'blur'
      }],
      confirmPassword: ['', 
      {
        validators: [
          Validators.compose([
            Validators.required, 
            Validators.minLength(6), 
            Validators.maxLength(20),
          ])
        ],
        updateOn: 'blur'
      }],
      email: ['', Validators.compose(
        [Validators.required, 
         Validators.email])]
    }, { validators: CustomValidators.passwordMatch('password', 'confirmPassword') })
  }

  initForm() {
  }

  onAdd() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get password(){
    return this.registerForm.get("password");
  }

  get confirmPassword(){
    return this.registerForm.get("confirmPassword");
  }
}
