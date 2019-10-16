import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

// custom validator to check that field contains only alphabets and Comma(,)
export function AlphaComma(controlName: string) {
    return (formGroup: FormGroup) => {
        if (formGroup !== undefined) {
            const control = formGroup;
            if (!(/^[a-zA-Z,]*$/.test(control.value))) {
                return { alphaComma: true };
            } else {
                return null;
            }
        }
    }
}