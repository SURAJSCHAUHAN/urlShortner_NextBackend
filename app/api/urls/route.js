import URL from '@/models/url';
import connectDB from '@/libs/database';
import { NextResponse } from 'next/server';
import shortid from 'shortid';


export async function POST(request) {
    const {urldata} =await request.json();
    await connectDB();
    const shortID=shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl:urldata,
        visitHistory:[]
    });
    return NextResponse.json({id:shortID},{status:201})
}