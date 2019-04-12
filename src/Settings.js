import React, { Component } from 'react'

export default class Settings extends Component {
  constructor(props){
    super(props);
     this.state = {
      uid : global.uid,
      username: global.uid,
      color:'',
      clock: '',
      sendmsg:'',
      language:''
    }
    
    this.getUserInfo = (e) => {
      e.preventDefault();
      let userArray = JSON.parse(localStorage.Userdata);
       userArray.map((user) => {
         if(user.uid === global.uid){
           console.log(user);
           user.username = this.state.username;
           user.color = this.state.color;
           user.clock = this.state.clock;
           user.language = this.state.language;
           user.smsg = this.state.sendmsg;
           
         }
      });

      localStorage.setItem('Userdata',JSON.stringify(userArray));
    };

   // setTimeout(getUserInfo,10000);
}

getInitialState = () => {
  return { value:'select'}  
}

handleChange = e => {
  this.setState({[e.target.name]:e.target.value});
  console.log(e.target.name+ '>>>' +e.target.value);
};




  render() {
    return (<div>
         <div className="element">
            <label>userName</label><br/>
            <input type="text" defaultValue={this.state.username} onChange={ev => this.setState({username: ev.target.value})}/>
          </div>
          <div className="element">
            <label>Interface color</label><br/>
            <input type="radio" name="color" defaultValue='dark' onChange={this.handleChange}/> Dark   
            <input type="radio" name="color" defaultValue='light' onChange={this.handleChange}/> Light
          </div>
          <div className="element">
            <label>Clock Display</label><br/>
            <input type="radio" name="clock" defaultValue='12' onChange={this.handleChange}/> 12 Hours   
            <input type="radio" name="clock" defaultValue='24' onChange={this.handleChange}/> 24 hours
          </div>
          <div className="element">
            <label>Send messages on CTRL + Enter </label><br/>
            <input type="radio" name="sendmsg"  defaultValue="on" onChange={this.handleChange}/> On   
            <input type="radio" name="sendmsg" defaultValue="off" onChange={this.handleChange}/> Off
          </div>
          <div className="element">
            <label>Language </label><br/>
            <select name="language" value={this.state.value} onChange={this.handleChange}>
              <option value="english">English</option>
              <option value="french">French</option>
            </select>
          </div>
	        <button>Reset to default</button> 
          <button onClick={this.getUserInfo}>Save</button>
          </div>
       
    );
  }
}
