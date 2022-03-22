import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/emailValidator'
import { InvalidParamErrorexport } from '../errors/invalid-param-error'

export class SignUpController implements Controller {
  private emailValidator: EmailValidator

  constructor (emailValidatorValue: EmailValidator) {
    this.emailValidator = emailValidatorValue
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamErrorexport('email'))
      }
    } catch (err) {
      return serverError()
    }
  }
}
