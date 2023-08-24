import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validaton fails', () => {
    const sut = new RequiredFieldValidation('field')
    sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})