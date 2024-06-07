import URL from '@/models/url';
import connectDB from '@/libs/database';
import { NextResponse } from 'next/server';

export async function GET(request,{params}) {
    const {id}=params;
    const result=await URL.findOne({shortId:id});
    return NextResponse.json({
        shortId:result.shortId,
        totalClicks:result.visitHistory.length,
        analytics:result.visitHistory,
    })
}