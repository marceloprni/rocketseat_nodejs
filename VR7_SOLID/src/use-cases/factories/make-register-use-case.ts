import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ResgisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const userRepository = new PrismaUsersRepository()
  const registerUseCase = new ResgisterUseCase(userRepository)

  return registerUseCase
}
