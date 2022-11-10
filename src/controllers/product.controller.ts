import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from 'zod';


const prisma = new PrismaClient();


export const allProducts = async (req:Request, res:Response) => {
    try{
        const list = await prisma.products.findMany();
        return res.status(200).json({list})
    }
    catch(err: any){
        res.status(400).send({error: "Request Failed"});
    }
}


export const addProduct = async (req:Request, res: Response) => {
    try{

        const createProductBody = z.object({
            tagName: z.string(),
            price:  z.number(),
            providerId: z.number()
        });

        const dataProduct = createProductBody.parse(req.body);
        
        const list = await prisma.products.create({
            data: {
                tagName: dataProduct.tagName,
                price: new Prisma.Decimal(dataProduct.price),
                providerId:  dataProduct.providerId
            }
        });

        return res.status(201).send({error: "Product Created", list});
    }
    catch(err: any){
        return res.status(400).send({error: "Registration Failed"});
    }
}


export const removeProduct = async (req:Request, res: Response) => {
    try{
        await prisma.products.delete({where:{id:Number(req.body.id)}});

        return res.status(200).send({error: "Delete Success"});
    }
    catch(err: any){
        return res.status(400).send({error: "Delete Failed"});
    }
}


export const updateProduct = async (req:Request, res: Response) => {
    const id = Number(req.body.id);
    let product;
    try{
        if(!await prisma.products.findUnique({where: {id: id}})){
            return res.status(400).send({error: "Product Not Found"});
        }
        
        if(req.body.price){
            product = await prisma.products.update({
                where: {
                    id: id
                },
                data: {
                    price: new Prisma.Decimal(req.body.price)
                }
            
            })
        }
        
        if(req.body.tagName){
            product = await prisma.products.update({
                where: {
                    id: id
                },
                data: {
                    tagName: String(req.body.tagName)
                }
            
            })
        }


        res.status(200).send({ product });
    }
    catch(err: any){
        return res.status(400).send({error: "Update Failed"});
    }
}