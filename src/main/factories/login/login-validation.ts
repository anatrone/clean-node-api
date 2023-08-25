import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { Validation } from '@/presentation/helpers/validators/validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'
import { EmailValidation } from '../../presentation/procotols/helpers/validators/email-validation'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}

// TODO? ARRUMAR OS PATHS DO SIGNUP NOS ARQUIVOS PQ A IDE ONLINE DO GITHUB EH UMA PORRA E NAO ARRUMA PRA MIM