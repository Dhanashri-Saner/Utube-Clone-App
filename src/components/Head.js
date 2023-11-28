import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
// import { Link } from 'react-router-dom';
import {YOUTUBE_SEARCH_API} from '../utils/constants';
import { cacheResult } from '../utils/searchSlice';

const Head = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector( (store)=> store.search);
  
  const dispatch = useDispatch();
  
  const toggleMenuHandler = ()=>{
    dispatch(toggleMenu());
  }

  useEffect(()=>{
    // console.log(searchQuery);
    const timer = setTimeout(()=>{
      if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery]);
      }
      else{
        getSearchQuery();
      }

    }, 200);

    return ()=> {
      clearTimeout(timer);
    }

  } ,[searchQuery]);

  const getSearchQuery = async ()=>{
    // console.log(searchQuery);

    const data = await fetch(YOUTUBE_SEARCH_API+searchQuery);
    const json = await data.json();
    // console.log(json);
    // console.log(json[1]);
    setSuggestions(json[1]);
    dispatch(cacheResult({
      [searchQuery] : json[1],
      })
    );
  }



  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-2xl sticky top-0 bg-white'>
    
    <div className='flex col-span-1 '>
      
      <img
        className=' h-10 cursor-pointer '
        alt='menu'
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAADPz89LS0uWlpb5+fmFhYXHx8eSkpJnZ2ezs7Oqqqp3d3cWFhbk5OT19fU/Pz9aWlra2tqkpKTu7u4PDw+9vb1gYGB9fX0zMzMkJCQaGhqbm5s4ODjLy8tQUFACQSuFAAACZ0lEQVR4nO3d7VLCMBCF4VipfKMiAorI/d+lVmHQP7spyczObt/nCs4Za7RhSVICAAAAAAAAAAAAAAAAgAEYT6b3fkwn4371Nvs7f/ab/IIT67A3mmT2a4/WSW92bLMKLq1zFljmVHyzTlnkTS/4YJ2x0INWcGWdsNhKaTi1DlhsKhd8tM5XwaPYcGYdr4KZ2HBhHa+ChdjwyTpeBU9iw1freBW8ig2t01UhNny3TlfBu9jw2TpeBc9iw5F1vApGYsPGOl4FjdgwwGIqL6Upza0DFpsrDdPBOmGhg1Ywra0jFlqrDZ0/p+oz2nmxTlngJadgSmPrnDfL3hZufb5ELbL2Es82H942TY8fPba8z1aNH9r2EwAAAAAAAAAA8Kz9nI/8mH/2+dypsz1Zf5bU22nbo1/jc1zhoEzSXPkdZlfH2H/trHMW2OUU9PkJ94U8IPzD+6S3POX9rbVOWEz7s+F3lbnQVhvrfBXIBf0OC13JY0P+H1LtMb23jlfBSWzo+duVF0uxoXW6Kgb+M4z/exh/LY3/9zDCUiMXDPCYav+Xxn+3iP9+OIB3/AHs03hebTL32lJqfH5ZNn+/NMXf8+5E/9wCAAAAAAAAAAB4EvucqOhnfYU/r83v2FDmmXvhz00Mf/Zl/PNLfX6p60o9g9b3M9rRntPwZ0HHP8/b611Wf8lnssc/V9/nuNd/8t0I1umqEBv6X0q1xTT+PTM+X5v+k8eEvU95d+RJ7/h3dsW/d20Ad+c5HmP/lTHMHv4OywHcQxr/Ltnk9x0q9z7gNIA7nTvB7+UGAAAAAAAAAAAAAAAAAJ++ACLpVB+zWmM6AAAAAElFTkSuQmCC"
        onClick={()=>toggleMenuHandler()}
      />
      
      <a href='/'>
      <img
        className=' h-[40px] cursor-pointer ml-3'
        alt='logo'
        src='data:image/png;base64,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'
      />
      </a>
      
      
      

    </div>

    <div className=' col-span-10 '>

      <div>
      <input
      className='border border-gray-500 w-1/2 p-2 px-5 rounded-l-full'
        type='text'
        placeholder='search here..'
        value={searchQuery}
        onChange={(e)=>setSearchQuery(e.target.value)}
        onFocus={()=>setShowSuggestions(true)}
        onBlur={()=>setShowSuggestions(false)}
        
      />
      <button className='border border-gray-500 bg-gray-100 p-2 rounded-r-full '>Search</button>
      </div>

      { showSuggestions && (
        <div className=' fixed bg-white rounded-lg shadow-lg  w-[34.3%] p-2 px-5 border border-gray-100'>
        <ul>
          {suggestions.map(
            (suggestion)=><li className='shadow-sm py-2 hover:bg-gray-100' key={suggestion}> {suggestion}  </li>
            )}
          
        </ul>
        </div>
       )
      }

    </div>

    <div className='col-span-1'>
      <img
        className='w-10 h-10 cursor-pointer'
        alt='user-icon'
        src='data:image/png;base64,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'
      />
    </div>

    </div>
  )
}

export default Head;
