import { NextRequest, NextResponse } from "next/server";
import { ResourceAccommodation } from "@/app/types/csv-object";
import prisma from '../../../../lib/prisma';

export async function POST(request:Request) {
    const data:ResourceAccommodation[] = await request.json();

    const savedData = await prisma.resourceAccommodation.createMany({
        data,
    })

    return Response.json({
        "status": 200,
        savedData,
    })
}

export async function GET(request:Request) {

    return NextResponse .json({
        message: 'Hello from the server!!!'
    })
}