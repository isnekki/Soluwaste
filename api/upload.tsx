import { NextResponse } from "next/server"
import path from "path"
import { writeFile } from "fs/promises"
import { NextApiRequest } from "next"

export async function upload(request: NextApiRequest) {
    const formData = await request.body.formData()
    const file = formData.get("file")

    if (!file) return NextResponse.json({ error: "No file uploaded. "}, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = file.name.replaceAll(" ", "_")
    console.log(filename)

    return writeFile(path.join(process.cwd(), "public/assets" + filename), buffer)
        .then(() => NextResponse.json({ Message: "Success", status: 201}))
        .catch(error => NextResponse.json({ error, status: 500 }))
}