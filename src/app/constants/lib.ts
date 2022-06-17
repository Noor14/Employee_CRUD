import { FormGroup, FormControl, FormArray } from "@angular/forms";

export function convertObjectToQueryString(obj: any): string{
  return Object.keys(obj).map(key => obj[key] && `${key}=${obj[key]}`).filter(item => item).join('&');
}

export function validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        validateAllFormFields(control);
      }
      else if (control instanceof FormArray){
        control.controls.forEach((formGroupControl) => {
          if(formGroupControl instanceof FormGroup){
            validateAllFormFields(formGroupControl);
          }
        });
      }
    });
}

export const pagination = {
  page: 1,
  limit: '10',
}

export const regexPattern = {
 emailRegex: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$/,
 alphaRegex: /^\S+[a-zA-Z ]+$/
}