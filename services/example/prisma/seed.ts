const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()
const main = async() => {
  const firstNote = await prisma.notes.create({
    data: { 
      title: "First note",
      description: "Seeded first note"
    }
  });
  console.log(firstNote);

  const firstUser = await prisma.user.create({
    data: {
      email: "damolasd@gmail.com",
      password: "12345678",
      username: "damolasd",
      notes: {
        create: [
          {
            title: "Prisma",
            description: "Prisma is fun!!!"
          },
          {
            title: "Test",
            description: "Testing out Prisma"
          }
        ]
      }
    }
  });
  console.log(firstUser);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.disconnect()
  })