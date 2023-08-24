import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation =>  {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validaton fails', () => {
    const sut = makeSut()
    sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    sut.validate({ name: 'any_name' })
    expect(error).toBeFalsy()
  })
})