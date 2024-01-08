import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) =>{

    const body = await request.json();

    const pass = await prisma.password_Reset.findFirst({
        where: {
            token: String(body.token)
        }
    });

    const all = await prisma.user.update({
        where:{
            id: Number(pass?.user_id)
        },
        data: {
            password: await bcrypt.hash(body.password, 10),
        }
    });

    const deleteResetPass = await prisma.password_Reset.delete({
        where:{
            user_id: Number(pass?.user_id)
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


export const GET = async (request: NextRequest) => {

    const search = new URL(request.url).search;
    const urlParams = new URLSearchParams(search);
    const token = urlParams.get("token");
    const now = new Date().getTime();

    const pass = await prisma.password_Reset.findFirst({
        where: {
            token: String(token)
        }
    });

    const isLinkExpired = isExpired( Number(now), Number(pass?.expires) );

    return NextResponse.json(
        { 
            success: true,
            message: "",
            data: {
                isLinkExpired: isLinkExpired
            }
        }
    );
}

const isExpired = (now: number, expires: number) => {
    return now > expires || isNaN(expires) ? true : false;
}