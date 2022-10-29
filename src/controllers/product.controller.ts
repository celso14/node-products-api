import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const all = async (req:Request, res:Response) => {
    const list = await prisma.products.findMany();
    res.json({list})
}