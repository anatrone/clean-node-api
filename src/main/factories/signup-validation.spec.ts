import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { Validation } from '@/presentation/helpers/validators/validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { EmailValidation } from '../../presentation/procotols/helpers/validators/email-validation'
import { EmailValidator } from '../../presentation/procotols/email-validator'

jest.mock('@/presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUpValidation', () => {
  test('Should call ValidationCOmposite with all validations', async () => {
    const validations: Validation[] = []
    makeSignUpValidation()

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidations("passwrod", "passwordConfirmation"))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
