import {
    ValidationErrors,
    ValidatorFn,
    AbstractControl,
    FormControl,
    FormGroup,
} from "@angular/forms";

export class CustomValidators {
    public static numbers(control: AbstractControl) {
        const regExp: RegExp = /[0-9]/;
        return regExp.test(control.value) ? null : { notNumber: true };
    }

    public static minLength(value: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } => {
          return c.value && c.value.trim().length >= value ? null : { minlength: true };
        };
      }

    public static passwordStrength(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if(!value){
                return null;
            }

            const hasUpperCase = /[A-Z]+/.test(value);
            const hasLowerCase = /[a-z]+/.test(value);
            const hasNumeric = /[0-9]+/.test(value);
            const hasSpecial = /[^A-Za-z0-9 ]+/.test(value);
            const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;

            return passwordValid ? null : { passwordStrength: true };
        }
    }

    public static passwordMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {    
            if(!controlName || !matchingControlName){
                return null;
            }
    
            const pass = formGroup.controls.password;
            const confirmPass = formGroup.controls.confirmPassword;
    
            if(confirmPass.errors && !confirmPass.errors.passwordNotMatch) {
                return;
            }
            if(pass.value !== confirmPass.value) {
                confirmPass.setErrors({ passwordNotMatch: true })
            }
            else {
                confirmPass.setErrors(null);
            }
        }
    }
}