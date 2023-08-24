import { CompareFieldsValidation } from './required-field-validation'
import { InvalidParamError } from '../../error'

const makeSut = (): CompareFieldsValidation =>  {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validaton fails', () => {
    const sut = makeSut()
    sut.validate({ 
      field: 'any_value',
      fieldToCompare: 'wrong_value'
    })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})