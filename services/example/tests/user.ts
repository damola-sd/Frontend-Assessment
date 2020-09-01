import App from "../src";
import "../src/env";
import request from "supertest";
import * as assert from "uvu/assert";
import "hard-rejection/register";
import { PrismaClient } from "@prisma/client";
import { suite } from "uvu";

const User = suite("User API");

User.before(async (context) => {
  context.prisma = new PrismaClient();
  App.locals.prisma = context.prisma;
  await context.prisma.queryRaw(`DELETE from "user";`);
});

User.after(async (context) => {
  await context.prisma.queryRaw(`DELETE from "user";`);
  const count = await context.prisma.user.count();
  assert.is(count, 0);
});

User("Create endpoint works as expected", async (context) => {
  await request(App)
    .post("/users/create")
    .send({
      email: "talk2mm@yahoo.com",
      password: "12345",
      name: "damola"
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .then((response) => {
      assert.is(response.body.email, "talk2mm@yahoo.com");
      assert.is(response.body.username, "damola");

    });
});

// User("Update Note endpoint works as expected", async (context) => {
//   await context.prisma.user.create({
//     data: {
//       email: "damolasd@gmail.com",
//       password: "12345678",
//       username: "damolasd",
//       notes: {
//         create: [
//           {
//             title: "Prisma",
//             description: "Prisma is fun!!!"
//           },
//           {
//             title: "Test",
//             description: "Testing out Prisma"
//           }
//         ]
//       }
//     }
//   });
//   await request(App)
//     .get(`/users/test/notes`)
//     .then((response) => {
//       assert.is(response.body, Array);
//     });
// });

User.run();