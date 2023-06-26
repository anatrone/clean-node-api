import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { MissingParamError } from '@/presentation/errors'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }

    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }
  }
}
