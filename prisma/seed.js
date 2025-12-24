
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@apnisec.com' },
    update: {},
    create: {
      email: 'admin@apnisec.com',
      name: 'Admin User',
      password: 'hashed_password_placeholder', // user should hash real passwords
    },
  });

  const hacker = await prisma.user.upsert({
    where: { email: 'hacker@apnisec.com' },
    update: {},
    create: {
      email: 'hacker@apnisec.com',
      name: 'Ethical Hacker',
      password: 'hashed_password_placeholder',
    },
  });

  // Create issues
  await prisma.issue.create({
    data: {
      type: 'CLOUD_SECURITY',
      title: 'Open S3 Bucket found',
      description: 'Critical data exposed in public S3 bucket xyz-logs',
      priority: 'high',
      status: 'open',
      userId: admin.id,
    },
  });

  await prisma.issue.create({
    data: {
      type: 'VAPT',
      title: 'SQL Injection in Login',
      description: 'Blind SQLi vulnerable on /api/login endpoint',
      priority: 'critical',
      status: 'review',
      userId: hacker.id,
    },
  });

  await prisma.issue.create({
    data: {
      type: 'RETEAM_ASSESSMENT',
      title: 'Domain Admin Compromised',
      description: 'Lateral movement successful via SMB',
      priority: 'critical',
      status: 'remediated',
      userId: hacker.id,
    },
  });

  console.log('Seed data created successfully');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
