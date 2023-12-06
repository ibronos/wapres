import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from "path";
import { PrismaClient, Media } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;
  
  await upload(file);
}

export async function upload(file:any) {
    
    if (!file) {
      return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const rndInt = randomIntFromInterval(100, 999);
    let filename = file.name;
    filename = filename.toLowerCase();

    let fileRename = Date.now().toString() + "_" + rndInt + "-" + filename;
    const pathFile = path.join(process.cwd(), `/public/upload/${fileRename}`);

    await writeFile(pathFile, buffer)

    // console.log(`open ${pathFile} to see the uploaded file`);

    await prisma.media.create({
        data: {
            name: fileRename
        }
    });

    return NextResponse.json({ 
      success: true,
      message: "",
      data: {
          filename: fileRename
      }
    })

}

function randomIntFromInterval(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export async function getFileByName(name:string) {

    const all = await prisma.media.findFirst({
        where: {
            name: name
        }
    });

    return NextResponse.json({ 
      success: true,
      message: "",
      data: {
          data: all
      }
    });

}