import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from './signup-procols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, serverError, sucessRequest } from '../../helpers/http-helper'

export class SignUpController implements Controller {
  private emailValidator: EmailValidator
  private addAccount: AddAccount

  constructor (emailValidatorValue: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidatorValue
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return sucessRequest(account)
    } catch (err) {
      return serverError()
    }
  }
}
