import { PrismaClient } from "@prisma/client";
import { Router } from "express";
const bcrypt = require('bcrypt') ;

const router = Router();

router.post("/create", async (req, res) => {
  try {
    const saltRounds:Number = 12;
    const prisma: PrismaClient = req.app.locals.prisma;
    const { email, password, name } = req.body;
    // bcrypt.hash(password, saltRounds, function(err:Object, hash:String) {

    // });
    const newUser = await prisma.user.create({
      data: { email, password, username: name }
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(500).json(err.message)
  }

});

router.get("/:username/notes", async (req, res) => {
  try {
    const prisma: PrismaClient = req.app.locals.prisma;
    const userNotes = prisma.user.findOne({
      where: { username: req.params.username },
      include: { notes: true, },
    });
    res.status(200).json(userNotes);
  } catch (err) {
    res.status(500).json(err.message)
  }


})

export default router;