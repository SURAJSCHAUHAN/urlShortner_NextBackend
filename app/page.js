'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {

  const router=useRouter();

  const [urldata,setUrlData]=useState('');
  const [data,setData]=useState({});
  const [analysis,setAnalysis]=useState({});

  const handleChange=(e)=>{
    setUrlData(e.target.value);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!urldata){
      alert('Please enter URL');
      return;
    }
    try {
        const res=await fetch('/api/urls',{
          method:'POST',
          headers:{"Content-Type": "application/json"},
          body:JSON.stringify({urldata})
        });
        const data=await res.json();
        setData(data);
        if(res.ok){
            router.refresh();
        }else throw new Error("Failed to Create.");
    }catch (error) {
      console.log(error);
    }
    setUrlData('');
  }

  const handleLink=async(id)=>{
    await fetch(`/api/urls/${id}`)
    .then(response=>response.json())
    .then(response=>{
      router.push(response.redirectUrl);
    })
    .catch(err=>console.log(err));
  }

  const handleAnalysis=async(urldata)=>{
      urldata=urldata.slice(-9);
      fetch(`/api/analysis/${urldata}`)
      .then(response=>response.json())
      .then(response=>setAnalysis(response))
      .catch(err=>console.log(err))
  }

  return (
    <div className='flex flex-col w-[100vw] h-[100%] bg-gray-200'>
      <div className='flex flex-col justify-center items-center w-full gap-5 mt-[20vh]'>
        <input type="text" className='rounded-md px-20 py-3 border-2 border-gray-600 text-center' placeholder='Enter Your URL' value={urldata} onChange={handleChange}/>
        <div>
          <button onClick={handleSubmit} className='rounded-md px-10 py-3 border-2 bg-gray-600 text-white text-center hover:scale-105 duration-300'>Get Short URL</button>
          <button onClick={()=>handleAnalysis(urldata)} className='rounded-md px-10 py-3 border-2 bg-gray-600 text-white text-center hover:scale-105 duration-300'>Analyase URL</button>
        </div>
      </div>
      {data.id && 
        <div className='flex justify-center mt-[20vh] text-blue-400 text-xl font-semibold '>
          <Link href={`https://urlshortnersuraj.vercel.app/api/urls/${data.id}`} target='_blank' onClick={()=>handleLink(data.id)}><h1>{`https://urlshortnersuraj.vercel.app/api/urls/${data.id}`}</h1></Link>
        </div>
      }
      {analysis.totalClicks && 
        <div className='flex flex-col gap-5 justify-center text-center mt-[20vh] text-blue-400 text-xl font-semibold '>
          <Link href={`https://urlshortnersuraj.vercel.app/urls/${analysis.shortId}`} target='_blank' onClick={()=>handleLink(data.id)}><h1>{`https://urlshortnersuraj.vercel.app/api/urls/${analysis.shortId}`}</h1></Link>
          <h1>Total Clicks: {analysis.totalClicks}</h1>
          {
            analysis.analytics && analysis.analytics.map(time=>(
              <h1 key={time._id}>{time.visitTime}</h1>
            ))
          }
        </div>
      }
    </div>
  )
}

export default page