import React, { useEffect, useState } from 'react';
import { YOUTUBE_VIDEOS_API } from '../utils/constants'; 
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

const Videocontainer = () => {
  
  const [videos, setVideos]= useState([]);
  useEffect(()=>{
    getVideos()
  },[]);

  const getVideos = async ()=> {
    const data = await fetch(YOUTUBE_VIDEOS_API);
    const jsonData = await data.json();
    // console.log(jsonData.items);
    setVideos(jsonData.items);
  }
  /* <VideoCard info={videos[0]}/> */

  return (
    <div className='flex flex-wrap'>
    {videos.map( (video)=>

      <Link to={"watch?v="+video.id} key={video.id}>

        <VideoCard info={video} />

      </Link>
      )
    }
      
    </div>
  )
}

export default Videocontainer;
