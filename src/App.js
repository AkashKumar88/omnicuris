import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import VideoList from "./components/VideoList"
import { Player } from "video-react";
import "../node_modules/video-react/dist/video-react.css";

import './App.css';
import { Link, BrowserRouter } from 'react-router-dom';
import Axios from 'axios';
import data from "./data";

function App() {
  const [videoContent, setvideoContent] = useState({});
  const [expertsList, setExpertList] = useState([]);

  useEffect(() =>{
const fetchData = async () => {
   await Axios.get("https://stgapi.omnicuris.com/api/v3/courses/thyroid-in-pregnancy/experts", {
      headers: {
        'hk-access-token': '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f'
      }
  })
  .then(response => {
      // setList(response.data.courseDetails.modules);
      setExpertList(response.data.expertDetails);
    })
  }

  fetchData();
  return ()=> {
    //
  };
},[]);

  // console.log(expertsList);
 

  const chapterClick = (content,title,image) => {
    setvideoContent({ content : content,title : title, image: image });
  }
  

  return (
    <BrowserRouter>
          <div className="grid-container">
      <header className="header">
      <Link to="/" className="header_link">Omnicuris</Link>
      <img alt="Omnicuris" className="ui avatar image" src="/images/omni_logo.jpg"/>
        
      </header>

      <main className="main">
        {/* <div className="ui container"> */}
          <div className="ui grid" style={{margin : "0 2rem"}}>
            <div className="ui row">
              <div className = "eleven wide column">
                <Player
                  playsInline
                  // poster="/images/omni.jpg"
                  poster={videoContent.image ? `${videoContent.image}` : '/images/omni.jpg'}
                  src={`${videoContent.content}`}
                />
                {videoContent.title &&  <div style={{'margin-top': '2rem'}}>
                                              <h1 className="ui top attached header" id="description_Header" >Topic</h1>
                                              <div className="ui attached segment"><h1>{videoContent.title}</h1></div> 
                                          </div> }

                <h1 className="ui top attached header" id="description_Header" >Description</h1>
                <div className="ui attached segment"><h2>{data.chapters.description}</h2></div>

                <h1 className="ui top attached header" id="description_Header">Expert Panel</h1>
                <div className="ui attached segment">
                <div className="ui massive horizontal divided list" id="expertList" >{expertsList.map(l => <div className="expert-Item item" key={l.id}>                 
                  <div className="video-content content">
                  <img className="ui small image" id="expert_image" alt={l.id} src={l.profilePic} />
                    <div className="header" style={{textAlign: "center"}}>{l.expertName}</div>
                      <div style={{textAlign: "center", color: "red"}}>{l.qualification}</div>
                    </div>
              </div>)}
          </div>

                </div>

              </div>
              <div className = "five wide column">   
                <VideoList chapterClick={chapterClick}/>
                
              </div>
              {/* <img className="ui small image" alt="image1" src="/images/artist.jpg" style={{postion: "relative", bottom: "0px", left: "50%"}}></img>  */}
            </div>
            
            
            
          </div>
          {/* <div className="ui hidden divider">--</div> */}

          {/* </div> */}
      </main>
      
      <footer className="footer">
        India's Largest Online CME PlatForm
      </footer>


    </div>
    </BrowserRouter>

  );
}

export default App;
