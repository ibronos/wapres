import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Post_Category } from "@prisma/client";
import { upload, getFileByName } from "../upload/route";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) =>{

    const formData = await request.formData();
    const file: File | null = formData.get('file') as unknown as File;
    const name: string | null = formData.get('name') as string;
    const slug: string | null = formData.get('slug') as string;
    const imageId = await getImageId(file);
    const data = await storeData(name, slug, imageId);

    return NextResponse.json(
        { 
            success: true,
            message: "",
            data: data
        }
    );

}

async function getImageId(file: any) {
    let imageId = null;
    
    if(file){
        const upFile = await upload(file);
        let uploadStatus = await upFile.json();
        if(uploadStatus.data.filename){
            const getImageId = await getFileByName(uploadStatus.data.filename);
            let getImageIdStatus = await getImageId.json();
            imageId = getImageIdStatus.data.data.id;
        }
    }

    return imageId;
}

async function storeData(name: string, slug:string, imageId: any) {
    const all = await prisma.post_Category.create({
        data: {
            name: name,
            slug: slug,
            image_id: imageId
        }
    });

    return all;
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