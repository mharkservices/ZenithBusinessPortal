import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create two users
    await prisma.user.createMany({
      data: [
        {
          email: 'admin@zenithfilings.com',
          password: await bcrypt.hash('admin123', 10),
          name: 'User One',
          role: 'admin'
        },
        {
          email: 'hari@zenithfilings.com',
          password: await bcrypt.hash('Hari123', 10),
          name: 'Hari',
          role: 'admin'
        }
      ]
    });

    console.log('Successfully created users');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 