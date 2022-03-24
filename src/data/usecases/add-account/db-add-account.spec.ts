import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  test('should call Encrypter with correct password', async () => {
    class EncrypterSub {
      async encrypt (value: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_password'))
      }
    }

    const encrypterSub = new EncrypterSub()
    const sut = new DbAddAccount(encrypterSub)
    const encryptSpy = jest.spyOn(encrypterSub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
