import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData()

  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  let fileRename = Date.now().toString() + "_" + file.name;
  const pathFile = path.join(process.cwd(), `/public/upload/${fileRename}`);

  await writeFile(pathFile, buffer)

  console.log(`open ${pathFile} to see the uploaded file`)

  return NextResponse.json({ 
    success: true,
    message: "",
    data: {
        filename: fileRename
    }
  })
}