import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from 'zod';


const prisma = new PrismaClient();


export const allProviders = async (req: Request, res: Response) => {
    try{
        const providers = await prisma.providers.findMany();

        res.status(200).send({providers});
    }
    catch(err: any){
        res.status(400).send({error: "Request Failed"});
    }
}


export const addProvider = async (req:Request, res: Response) => {
    try{
        const createProviderBody = z.object({
            email: z.string(),
            name: z.string(),
            phone: z.string()
        });

        const dataProvider = createProviderBody.parse(req.body);
        
        const list = await prisma.providers.create({
            data: {
                email: dataProvider.email,
                name: dataProvider.name,
                phone: dataProvider.phone
            }
        })

        
        return res.status(201).send({error: "Provider Created", list});
    }
    catch(err: any){
        res.status(400).send({ error: "Registration Failed" })
    }
}


export const removeProvider = async (req:Request, res: Response) => {
    try{
        await prisma.providers.delete({where:{id:Number(req.body.id)}});

        return res.status(200).send({error: "Delete Success"});
    }
    catch(err: any){
        return res.status(400).send({error: "Delete Failed"});
    }
}


export const updateProvider = async (req:Request, res: Response) => {
    const id = Number(req.body.id);
    let provider;
    try{
        if(!await prisma.providers.findUnique({where: {id: id}})){
            return res.status(400).send({error: "Provider Not Found"});
        }
        
        if(req.body.email){
            provider = await prisma.providers.update({
                where: {
                    id: id
                },
                data: {
                    email: String(req.body.email)
                }
            
            })
        }
        
        if(req.body.name){
            provider = await prisma.providers.update({
                where: {
                    id: id
                },
                data: {
                    name: String(req.body.name)
                }
            
            })
        }

        if(req.body.phone){
            provider = await prisma.providers.update({
                where: {
                    id: id
                },
                data: {
                    phone: String(req.body.phone)
                }
            
            })
        }


        res.status(200).send({ provider });
    }
    catch(err: any){
        return res.status(400).send({error: "Update Failed"});
    }
}