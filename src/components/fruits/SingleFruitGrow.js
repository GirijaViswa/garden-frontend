import React from "react";
import "./SingleFruit.css";
import { connect } from "react-redux";
import Login from '../Login/Login';

import {BrowserRouter as Router,Redirect,withRouter,Route} from 'react-router-dom';

//List all the gardening videos available for this fruit

// const handleSubmit = (e,props) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token")
//     var data = {email:e.target.Email.value,password:e.target.Password.value}
//     var headers = {"Content-Type":"application/json","Accept":"application/json",Authorization:token}

//     fetch("http://localhost:3000/auth",{method:"POST",headers:headers ,body:JSON.stringify(data)})
//     .then(resp => resp.json())
//     .then(user => {
//         if (user.id)
//         {
//             localStorage.setItem('token',user.token)
//             localStorage.setItem('user_id',user.id)
//             props.dispatch({type:"LOGIN",token:user.token})
//             console.log(props)
//             // props.handleLogin()
//             // props.history.push('/')
//         }})
// }

const addToCollection = (video,props) => {
  if (localStorage.getItem("token")) {
    const token = localStorage.getItem("token");
    var data = { video_id: video.id, user_id: localStorage.getItem("user_id") };
    var headers = {"Content-Type": "application/json",Accept: "application/json",Authorization: token};
    fetch(`http://localhost:3000/users/${localStorage.getItem("user_id")}/mycollections`,{ method: "POST", headers: headers, body: JSON.stringify(data) })
      .then(resp => resp.json())
      .then(data => {
        if (data.status === "ok") 
        {
          alert(data.msg);
          props.dispatch({ type: "ADD_VIDEOS", posts: data.mycollection });
          // this.props.dispatch({ type: "ADD_VIDEOS", posts: data.mycollection });
        }
      })
      .catch(error => 
        {
          console.error("Error", error);
        });
  } 
  else 
  {
    // return <Route> <Redirect to="/login"/></Route>
    // props.dispatch({type:"PUSH_LOGIN"})
    alert("Kindly Login/Signup to save this video to your collection.");
    props.history.push("/login");
    // return <Route path="/login" component={Login}/>
  }
};

const SingleFruitGrow = props => (
<div>
  <p>*Checkout how to grow them in your backyard!</p>
  <div className="Video_Lister">
    <br />
    <br />
    
    {props.fruit.single_fruit.garden_videos.map(video => {
      //    { props.fruit_garden.map(video => {
      return (
        <div className="Video_Item">
          <iframe
            width="400"
            height="300"
            src={video.url}
            frameborder="0"
          ></iframe>
          <br />
          <br />
          <div
            class="heart"
            id={video.id}
            onClick={() => addToCollection(video,props)}
          ></div>
          <br />
          <br />
        </div>
      );
    })}
  </div></div>
);

const mapStatetoProps = state => ({ fruit: state.fruits, user: state.user });

export default connect(mapStatetoProps)(SingleFruitGrow);
