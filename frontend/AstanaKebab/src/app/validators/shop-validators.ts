import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {

    //customized(own) whitespace validation 
    static notOnlyWhitespace(control : FormControl) : ValidationErrors | null{

        //if string field contains only whitespace
        if((control.value != null) && (control.value.toString().trim().length === 0)){

            return {
                'notOnlyWhitespace' : true //validation error key  
            }
        } else { //means no errors there 
            return null;
        }
    }
}
