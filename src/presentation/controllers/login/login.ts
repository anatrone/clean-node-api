import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { EmailValidator } from '../signup/signup-protocols'
import { Authentication } from '@/domain/usecases/authentication'

export class LoginController implements Controller {
  private readonly emailValitador: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValitador: EmailValidator, authentication: Authentication) {
    this.emailValitador = emailValitador
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValitador.isValid(httpRequest.body.email)

      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }

      await this.authentication.auth(email, password)
    } catch (err) {
      return serverError(err)
    }
  }
}
