import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CompanyregisterationService } from '../modules/landingpage/services/companyregisteration.service';

@Directive({
  selector: '[emailValidator]',
  providers:[{provide:NG_ASYNC_VALIDATORS,useExisting:EmailValidatorDirective,multi:true}]
})
export class EmailValidatorDirective implements AsyncValidator{
  constructor(private companyService:CompanyregisterationService) { }
  validate(control: AbstractControl): Promise<ValidationErrors> | import("rxjs").Observable<ValidationErrors> {
    return this.companyService.getMember(control.value).pipe(
      map(member=>
        {
          console.log(member);
          return 1 ? {'emailValidator':true}:null;

        })
    )
  }

  
  

}
