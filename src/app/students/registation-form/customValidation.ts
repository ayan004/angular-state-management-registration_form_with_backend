import { AbstractControl } from "@angular/forms";

var password;

export function ValidatePasswordNoConsecutiveNumberOrAlphabet(control: AbstractControl): { [key: string]: any } | null {
  password = control.value;
  if (control.value !== null) {
    if (password.length > 1) {
      var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
      var result = str.match(password);
      if (result !== null) {
        return { 'consecutiveCharacters': true };
      }
    }
  }
  return null;
}

export function ValidatePasswordAllValidations(control: AbstractControl): { [key: string]: any } | null {
  password = control.value;
  if (control.value !== null) {
    var upperCaseCheck = /(?=.*[A-Z])/;
    if (!upperCaseCheck.test(password)) {
      return { 'noCapitalLetter': true };
    }

    var lowerCaseCheck = /(?=.*[a-z])/;
    if (!lowerCaseCheck.test(password)) {
      return { 'noSmallLetter': true };
    }

    var digitCheck = /(?=.*\d)/;
    if (!digitCheck.test(password)) {
      return { 'noNumber': true };
    }

    var specialCharacterCheck = /(?=.*[!@#$%^&*])/;
    if (!specialCharacterCheck.test(password)) {
      return { 'noSpecialCharacter': true };
    }

  }

  return null;
}

export function ValidateConfirmPasswordEqualsPassword(control: AbstractControl): { [key: string]: any } | null {
  var confirm_password = control.value;
  if (password !== confirm_password) {
    return { 'notEqualToPassword': true };
  }
  return null;
}

export function ValidatePhone(control: AbstractControl): { [key: string]: any } | null {
  var ph_numb = parseInt(control.value);
  var ph_numb_str = ph_numb.toString();
  if (control.value !== null) {
    if ((ph_numb_str.length !== control.value.length) || (control.value && control.value.length != 10)) {
      return { 'phoneNumberInvalid': true };
    }
  }

  return null;
}

export function ValidatePhoneNumberCountryCode(control: AbstractControl): { [key: string]: any } | null {

  var ph_numb_country_code = control.value;
  if (control.value[0] !== '+') {
    return { 'phoneNumberCountryCodeInvalid': true };
  }

  var digitCheck = /(?=.*\d)/;
  if (!digitCheck.test(control.value[1])) {
    return { 'invalid2ndcharacter': true };
  }
  return null;
}

export function ValidatePincode(control: AbstractControl): { [key: string]: any } | null {
  var pincode = parseInt(control.value);
  var pincode_str = pincode.toString();
  if (control.value !== null) {
    if (pincode_str.length !== control.value.length) {
      return { 'pincodeInvalid': true };
    }
  }

  return null;
}

export function ValidateWebsite(control: AbstractControl): { [key: string]: any } | null {
  var website = control.value;
  var dotCount = 0;
  if (control.value !== null) {
    for (var i = 0; i < website.length; i++) {
      if (website[i] === ".") {
        dotCount++;
        if (website[i + 1] === undefined) {
          return { 'invalidWebsite': true };
        }
      }
    }
    if (website.length > 0 && dotCount === 0) {
      return { 'invalidWebsite': true };
    }
  }

  return null;
}

export function ValidateEmailWithSingleDot(control: AbstractControl): { [key: string]: any } | null {
  var email = control.value;
  var dot = 0;
  if (control.value !== null) {
    for (var i = 0; i < email.length; i++) {
      if (email[i] === ".") {
        dot++;
        if (email[i + 1] === undefined) {
          return { 'emailContainNoDot': true };
        }
        if (dot > 2) {
          return { 'emailContainNoDot': true };
        }
      }
    }
    if (dot == 0) {
      return { 'emailContainNoDot': true };
    }
  }

  return null;
}

export function ValidateEmailWithDot(control: AbstractControl): { [key: string]: any } | null {
  var email = control.value;
  var atTheRateCount = 0;
  var atTheRateIndex = 0;
  var dotCount = 0;
  if (control.value !== null) {
    var upperCaseCheck = /(?=.*[A-Z])/;
    var lowerCaseCheck = /(?=.*[a-z])/;
    var digitCheck = /(?=.*\d)/;
    for (var i = 0; i < email.length; i++) {
      if (email[i] === '.' || email[i] === '@') {
        //below code will run when there is any character after . or @
        if (!upperCaseCheck.test(email[i + 1])) {
          if (!lowerCaseCheck.test(email[i + 1])) {
            if (!digitCheck.test(email[i + 1])) {
              return { 'invalidEmail': true };
            }
          }
        }

        if (email[i] === '@') {
          atTheRateIndex = i;
          console.log(atTheRateIndex);
          atTheRateCount++;
          if (atTheRateCount > 1) {
            return { 'invalidEmail': true };
          }
          if (dotCount > 2) {
            //below code will check, how many dots are there between first character and @ symbol
            var dotCountBeforeAtTheRate = 0;
            for (var j = 0; j < atTheRateIndex; j++) {
              if (email[j] === '.') {
                dotCountBeforeAtTheRate++;
              }
              if (dotCountBeforeAtTheRate > 2) {
                return { 'invalidEmail': true };
              }
            }
          }
        } else {
          dotCount++;
          if (dotCount > 2) {
            var dotCountAfterAtTheRate = 0;
            for (var j = atTheRateIndex + 1; j < email.length; j++) {
              if (email[j] === '.') {
                dotCountAfterAtTheRate++;
              }
              if (dotCountAfterAtTheRate > 2) {
                return { 'invalidEmail': true };
              }
            }
          }
        }
      }
    }
    // below code is to detect when last character is dot or atTheRate
    if (email[email.length - 1] === '.' || email[email.length - 1] === '@') {
      return { 'invalidEmail': true };
    }
    // below code is to detect when there is no dot or atTheRate
    if (atTheRateCount === 0 || dotCount === 0) {
      return { 'invalidEmail': true };
    }
    // below code to detect there is atleast one dot after @ symbol or not
    if (atTheRateIndex !== 0) {
      console.log("I m on");
      dotCountAfterAtTheRate = 0;
      for (var j = atTheRateIndex + 1; j < email.length; j++) {
        if (email[j] === '.') {
          dotCountAfterAtTheRate++;
        }
      }
      if (dotCountAfterAtTheRate < 1) {
        return { 'invalidEmail': true };
      }
    }
  }

  return null;

}




