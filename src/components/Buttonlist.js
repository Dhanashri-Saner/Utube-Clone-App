import React from 'react';
import Button from './Button';

const list =['All', 'Songs', 'Cricket', 'Gaming', 'Comedy', 'News', 'Cooking', 'Football', 'Current-Affairs', 'React', 'DSA', 'C++']

const Buttonlist = () => {
  return (
    <div className='flex'>

      {/* <Button name="All"/> */}
      {list.map((item, i)=>(
        <Button name={item} key={i}/>
      ))}
      
      
    </div>
  )
}

export default Buttonlist;
