import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[passwordValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }]
})
export class PasswordValidatorDirective implements Validator {

  constructor() { }
  @Input('passwordValidator') controlNameToCompare: string;
  validate(c: AbstractControl): ValidationErrors | null {
    console.log(this.controlNameToCompare);
    const controlToCompare = c.root.get(this.controlNameToCompare);
    if (controlToCompare) {
      const subscription: Subscription = controlToCompare.valueChanges.subscribe(
        () => {
          c.updateValueAndValidity();
          subscription.unsubscribe();
        }
      )
      return controlToCompare && controlToCompare.value !== c.value ? { 'passwordValidator': true } : null;
    }
  }


}

