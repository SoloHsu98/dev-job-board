import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOption } from "../auth/[...nextauth].js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, location, salary, userId } = req.body;
    await prisma.job.create({
      data: {
        title,
        description,
        location,
        salary,
        author: {
          connect: { id: userId },
        },
      },
    });
    return res.status(201).end();
  }
  if (req.method === "PATCH") {
    const { id, task } = req.body;

    await prisma.job.update({
      where: {
        id: parseInt(id),
      },
      data: {
        published: task === "publish" ? true : false,
      },
    });

    return res.status(200).end();
  }

  return res.status(501).json({ message: "Method Not Allowed" });
}
