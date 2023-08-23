import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/helpers/validators/validation'
import { EmailValidator } from '../../protocols/emailValidator'

export class EmailValidation implements Validation {
  private readonly fieldName: string
  private readonly emailValidator: Validation

  constructor (fieldName: string, emailValidatorValue: EmailValidator) {
    this.fieldName = fieldName
    this.emailValidator = emailValidator
  }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
