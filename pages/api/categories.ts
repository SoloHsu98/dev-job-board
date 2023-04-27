import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOption } from "./auth/[...nextauth].js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, isCompany, name } = req.body;
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        isCompany,
      },
    });
    return res.status(201).end();
  }
  if (req.method === "GET") {
    const categories = await prisma.category.findMany({});
    res.status(200).json(categories);
  }

  return res.status(501).json({ message: "Method Not Allowed" });
}
