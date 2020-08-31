import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();

router.post("/create", async (req, res) => {
	const prisma: PrismaClient = req.app.locals.prisma;
	const { description, title } = req.body;
	const result = await prisma.notes.create({
		data: { description, title },
	});
	res.status(200).json(result);
});

router.get("/", async (req, res) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const results = await prisma.notes.findMany();

		res.status(200).json(results)

	} catch (err) {
		res.status(500).json(err.message);
	}

});

router.put("/:noteId", async (req, res) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const { description, title } = req.body;
		const { noteId } = req.params;
		const result = await prisma.notes.update({
			where: { id: Number(noteId) },
			data: { description, title }
		});
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json(err.message);
	}

});

router.delete("/:noteId", async (req, res) => {
	try {
		const prisma: PrismaClient = req.app.locals.prisma;
		const deleted = await prisma.notes.delete({
			where: { id: Number(req.params.noteId) }
		});
		res.status(200).json(deleted);
	} catch (err) {
		res.status(500).json(err.message);
	}

});

export default router;
