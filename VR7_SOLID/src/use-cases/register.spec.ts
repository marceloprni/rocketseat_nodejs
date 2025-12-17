import InMemoryUserRepository from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './error/user-already-exists-error'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { ResgisterUseCase } from './register'

let usersRepository: InMemoryUserRepository
let sut: ResgisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new ResgisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Larissa granato',
      email: 'larissagranato@gmail.com',
      password: '123654',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Larissa granato',
      email: 'larissagranato@gmail.com',
      password: '123654',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123654',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const email = 'larissagranato@gmail.com'

    await sut.execute({
      name: 'Larissa granato',
      email,
      password: '123654',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
