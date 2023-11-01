import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) =>{

    const body = await request.json();
    const all = await prisma.post_Category.create({
        data: {
            name: body.name,
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