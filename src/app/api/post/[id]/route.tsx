import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Post_Category } from "@prisma/client";

const prisma = new PrismaClient();

export const PATCH = async (request: NextRequest, {params}: {params: {id: string}}) =>{
 
    const formData = await request.formData();
    const title: string | null = formData.get('title') as string;
    const slug: string | null = formData.get('slug') as string;
    const imageId: string | number | null = formData.get('imageId') as string;

    const all = await prisma.post.update({
        where:{
            id: Number(params.id)
        },
        data: {
            title: title,
            slug: slug,
            image_id: Number(imageId)
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
    const all = await prisma.post.delete({
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

    const all = await prisma.post.findFirst({
        where:{
            id: Number(params.id)
        },
        include: {
          categories: true,
        },
      })

    return NextResponse.json(
        { 
            success: true,
            message: "",
            data: all
        }
    );
}