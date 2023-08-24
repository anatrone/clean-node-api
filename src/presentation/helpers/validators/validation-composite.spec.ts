import { ValidationComposite } from './validation-composite'
import { MissingParamError } from '../../error'

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeValidation = (): Validation =>  {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
}

const makeSut = (): SutTypes => {
  return validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])

  return  {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value'})
    expect(error).toEqual(new MissingParamError('field'))
  })
})