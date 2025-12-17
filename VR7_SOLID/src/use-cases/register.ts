import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/user-repository'
import { UserAlreadyExistsError } from './error/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseResponse {
  user: User
}

export class ResgisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseResponse> {
    console.log(name, email, password)
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
