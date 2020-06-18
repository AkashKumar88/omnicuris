import React, { useState } from "react";
import Axios from "axios";

const VideoItem = (props) => {

    const [details, setDetails] = useState([]);
    const [selctedId, setSelctedId] = useState();
    const [flag, setFlag] = useState(false);
  
   const fetchData = async (moduleId) => {
      await Axios.get("https://stgapi.omnicuris.com/api/v3/courses?courseSlug=thyroid-in-pregnancy&moduleId=37", {
         headers: {
           'hk-access-token': '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f'
         }
     })
     .then(response => {
        //  setDetails(response.data); 
         console.log(response.data);
       })
   }

    const findChapter = (event) => {
      // console.log(event.target.id);
      fetchData(event.target.id);
      setSelctedId(event.target.id);
      setFlag(flag===true ? false : true);
    }

    const chapterListClick = (event, content,title,slug) => {
      
      event.stopPropagation();
      // console.log(event.target);
      // console.log(content);
      props.onChapterClick(content,title, slug);
    }

    console.log(props.list);
    const chapterList = () => {
       console.log(details);
      // console.log(selctedId);
      return details.lessonDetails[0].userChapterDetails.map(c => {
        // console.log(details.lessonDetails[0].userChapterDetails.length);
        return (
          <div className="video-item-list item" key={c.id} id="list" onClick={(e) => chapterListClick(e, c.content,c.title, c.slug)}>
            <img alt ={c.title} className="ui avatar image" src ={c.chapterExperts[0].profilePic} id ={c.id}/>
              <div className="video-content content" id ={c.id}>
                <div className="description" id ={c.id}>{c.title}</div>
                <div className="clock-icon" id ={c.id}><i className="clock outline icon" ></i>{`${c.durationStr}`}</div>
                {/* <div className="description" style={{color: "blue"}} id ={l.id}>{l.name}</div> */}
            </div>
          </div>
        )
      });
      
    }
    
    return ( 
        <>
        {props.list.map( l => <div className="video-item item" onClick={findChapter} id ={l.id} key={l.id}>
        
        <div className="video-content content" id ={l.id}>
        {/* <img alt ={l.title} className="ui avatar image" src ={l.moduleExperts[0].profilePic} id ={l.id}/> */}
            <div className="header" style={{color: "red"}} id ={l.id}>
              <img alt ={l.title} className="ui avatar image" src ={l.moduleExperts[0].profilePic} id ={l.id}/>
              {l.title}
            </div>
            <div className="description" style={{color: "blue"}} id ={l.id}>{l.name}</div>
            <div className="clock-icon" id ={l.id}><i className="clock outline icon" ></i>{`${l.duration} mins`}</div>
            <div  className="ui large relaxed divided list">
              {/* { details.lessonDetails ? (parseInt(selctedId) === parseInt(l.id) && console.log(`${l.id} -- ${selctedId} -- ${l.title}`)) : '' } */}
              {flag=== true && ( details.lessonDetails ? (parseInt(selctedId) === parseInt(l.id) && chapterList()) : '' )}
              
              {/* { console.log(parseInt(selctedId) === parseInt(l.id) )} */}

                {/* {details.lessonDetails && chapterList()} */}
            </div>
              
        </div>
        
        </div>
          
        )} 
    </>
    );
}

export default VideoItem;