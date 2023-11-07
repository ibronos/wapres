import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Post_Category } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: NextRequest, {params}: {params: {id: string}}) =>{
    const body = await request.json();
    const all = await prisma.post_Category.update({
        where:{
            id: Number(params.id)
        },
        data:{
            name: body.name
        }
    });

     return NextResponse.json(
        { 
            success: true,
            message: "",
            data: all
        }
    );
}

export const DELETE = async (request: NextRequest, {params}: {params: {id: string}}) =>{
    const all = await prisma.post_Category.delete({
        where:{
            id: Number(params.id)
        }
    });

    return NextResponse.json(
        { 
            success: true,
            message: "",
            data: all
        }
    );
}

export const GET = async (request: NextRequest, {params}: {params: {id: string}}) => {

    const {id} = params;

    const all = await prisma.post_Category.findUnique({
        where: {
            id: Number(id)
        }
    });

    return NextResponse.json(
        { 
            success: true,
            message: "",
            data: all
        }
    );
}