import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { Validation } from '@/presentation/helpers/validators/validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { CompareFieldsValidations } from '@/presentation/helpers/validators/compare-field-validation'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldsValidations("passwrod", "passwordConfirmation"))
  return new ValidationComposite(validations)
}
