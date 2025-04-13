import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  const adminPassword = await hashPassword('admin123');
  const userPassword = await hashPassword('user123');

  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Regular User',
      password: userPassword,
    },
  });

  console.log({ admin, user });

  const task1 = await prisma.task.create({
    data: {
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the NestJS project',
      status: 'PENDING',
      priority: 'HIGH',
      dueDate: new Date('2025-04-15'),
      category: 'work',
      labels: 'documentation,important',
      ownerId: admin.id,
    },
  });

  const task2 = await prisma.task.create({
    data: {
      title: 'Fix authentication bugs',
      description: 'Resolve issues with JWT token validation',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      dueDate: new Date('2025-04-10'),
      category: 'work',
      labels: 'bug,security',
      ownerId: admin.id,
    },
  });

  const task3 = await prisma.task.create({
    data: {
      title: 'Buy groceries',
      description: 'Milk, eggs, bread, and vegetables',
      status: 'PENDING',
      priority: 'MEDIUM',
      dueDate: new Date('2025-04-08'),
      category: 'personal',
      labels: 'shopping,routine',
      ownerId: user.id,
    },
  });

  const task4 = await prisma.task.create({
    data: {
      title: 'Prepare presentation',
      description: 'Create slides for the team meeting',
      status: 'PENDING',
      priority: 'MEDIUM',
      dueDate: new Date('2025-04-12'),
      category: 'work',
      labels: 'meeting,presentation',
      ownerId: user.id,
    },
  });

  console.log({ task1, task2, task3, task4 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
