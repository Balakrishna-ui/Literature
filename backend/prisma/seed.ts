import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient({});

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'Super Admin',
    },
  });

  console.log('Admin user created:', admin);

  const PRESET_CATEGORIES = [
    'Personal Photos', 'Literary Events', 'Award Ceremonies',
    'Book Launches', 'Natakalu Images', 'Historical Moments'
  ];

  for (const name of PRESET_CATEGORIES) {
    await prisma.galleryCategory.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }
  console.log('Categories seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
