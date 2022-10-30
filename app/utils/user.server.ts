import type { Profile } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma.server'
import type { RegisterForm } from './types.server'

export async function createUser(user: RegisterForm) {
    const { email, firstName, lastName, password } = user

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            email,
            password: passwordHash,
            profile: {
                firstName,
                lastName,
            },
        },
    })

    return { id: newUser.id, email }
}

export async function getOtherUsers(userId: string) {
    return await prisma.user.findMany({
        where: { id: { not: userId } },
        orderBy: {
            profile: {
                firstName: 'asc',
            },
        },
    })
}

export async function getUserById(userId: string) {
    return await prisma.user.findUnique({ where: { id: userId } })
}

export async function updateuser(userId: string, profile: Partial<Profile>) {
    await prisma.user.update({
        where: { id: userId },
        data: {
            profile: {
                update: profile,
            },
        },
    })
}

export async function deleteUser(userId: string) {
    await prisma.user.delete({ where: { id: userId } })
}
