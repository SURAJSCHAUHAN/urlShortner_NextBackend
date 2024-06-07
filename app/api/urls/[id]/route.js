import URL from '@/models/url';
import connectDB from '@/libs/database';
import { NextResponse } from 'next/server';

export async function GET(request,{params}){
    const {id}=params;
    await connectDB();
    const url=await URL.findOneAndUpdate({
        shortId:id
    },{
        $push:{
            visitHistory:{visitTime:new Date()}
        }
    });
    return NextResponse.redirect(url.redirectUrl);
}