import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from '@/presentation/controllers/login/login-protocols'
import { badRequest, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'

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

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }
    } catch (err) {
      return serverError(err)
    }
  }
}
