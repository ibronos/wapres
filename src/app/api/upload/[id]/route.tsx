import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Media } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (request: NextRequest, {params}: {params: {id: string}}) => {

    const {id} = params;

    const all = await prisma.media.findUnique({
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