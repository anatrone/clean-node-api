import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { Validation } from '@/presentation/helpers/validators/validation'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('SignUpValidation', () => {
  test('Should call ValidationCOmposite with all validations', async () => {
    const validations: Validation[] = []
    makeSignUpValidation()

    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidations("passwrod", "passwordConfirmation"))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
