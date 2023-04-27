import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOption } from "../auth/[...nextauth].js";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    await prisma.job.delete({
      where: {
        id: parseInt(req.query.id),
      },
    });

    return res.status(200).json({ message: "Deleted Successfully !" });
  }

  return res.status(501).json({ message: "Method Not Allowed" });
}
