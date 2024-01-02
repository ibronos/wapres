import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) =>{

    const body = await request.json();

    const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
    });

    if(!user){
        return NextResponse.json(
            { 
                success: false,
                message: "User not found",
            },
            {status: 301}
        );
    }

    const emailFrom = "hello@wapres.id";
    const htmlEmail = '<html><head><title>Reset Password</title></head><body><p>visit this link to reset password:</p><a href="#">asdf</a></body> </html>';

    await sendEmail({
        from: emailFrom,
        to: body.email,
        subject: "Reset Password",
        html: htmlEmail,
    });

    return NextResponse.json(
        { 
            success: true,
            message: "",
        }
    );

}
