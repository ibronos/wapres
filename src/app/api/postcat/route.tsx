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

export const GET = async (request: NextRequest) => {

    const search = new URL(request.url).search;
    const urlParams = new URLSearchParams(search);
    const pageParams = urlParams.get("page");
    const limitParams = urlParams.get("limit");
    const searchParams = urlParams.get("search");

    const page = pageParams ? parseInt( pageParams ) : 1;
    const limit = limitParams ? parseInt( limitParams ) : 10;
    const searchVal = searchParams ? searchParams : "";
    const skip = (page - 1) * limit;

    const total = await prisma.post_Category.count();
    const totalPagination = Math.ceil(total/limit);

    const all = await prisma.post_Category.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          name: true
        },
        where:{
            name: {
                contains: searchVal,
            },
        },
    });

    return NextResponse.json(
        { 
            success: true,
            message: "",
            data: all,
            totalData: total,
            page: page,
            totalPagination: totalPagination,
            limit: limit
        }
    );
}