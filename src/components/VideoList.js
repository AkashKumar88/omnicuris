import React, { useState, useEffect } from 'react';
import Axios from 'axios';
// import VideoItem from './VideoItem';
import VideoDetails from './VideoDetails';

const VideoList = (props) => {

    const [list, setList] = useState([]);
    

    useEffect(() =>{
        // fetch('/api/products')
        // .then(function (response) { return response.json();})
        // .then(data => { setProducts(data);});
    //------using Axios --------------
    //console.log(fetchData);
    const fetchData = async () => {
       await Axios.get("https://stgapi.omnicuris.com/api/v3/courses?courseSlug=thyroid-in-pregnancy", {
          headers: {
            'hk-access-token': '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f'
          }
      })
      .then(response => {
          setList(response.data.courseDetails.modules);
        })
      }
      fetchData();
      return ()=> {
        //
      };
    },[]);
    // console.log(list);

return (
  <div className="ui large relaxed divided list" id="chapter-list">
    <VideoDetails list={list} onChapterClick={props.chapterClick}/>
    {/* <VideoItem list={list} onChapterClick={props.chapterClick}/> */}
  </div>
);
}

export default VideoList;