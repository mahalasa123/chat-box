import React from "react";
import io from "socket.io-client";

class Chat extends React.Component{
    constructor(props){
        super(props);
        global.uid = "GS-"+Math.floor(10000 + Math.random() * 90000);
        this.state = {
            sockId: '',
            message: '',
            author:'',
            messages: [],
            bubClassIs: 'user1'
          };
       
        const searchuser = (nameKey, myArray) => {
            for (var i=0; i < myArray.length; i++) {
                if (myArray[i]['uid'] === nameKey) {
                    return myArray[i];
                }else{
                    return false;
                }
            }
        }
        this.socket = io('localhost:8080');

        this.socket.on('connect', () => {
           // console.log(this.socket.id); // true
           
          this.setState({sockId:this.socket.id});
          this.setState({author:global.uid});

          if(localStorage.Userdata){
            let CurUserInfo = JSON.parse(localStorage.Userdata);
            const res = searchuser(global.uid,CurUserInfo);
            if(res === false) {
                let NewUserInfo = {uid:global.uid,username:global.uid};
            
                    CurUserInfo.push(NewUserInfo);
                localStorage.setItem('Userdata',JSON.stringify(CurUserInfo));
            }
        }
        else
        {
            let CurUserInfo = {uid:global.uid,username:global.uid};
            localStorage.setItem('Userdata',JSON.stringify([CurUserInfo]));
         }

          });
        
         this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });
        
        global.sid = this.state.sockId;
       
        const addMessage = data => {
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            let time = new Date();
            let nTime = time.toLocaleString('en-US', { hour:'numeric', minute:'numeric', hour12: true });
           
            this.socket.emit('SEND_MESSAGE', {
                message: this.state.message,
                author:this.state.author,
                sockId:this.state.sockId,
                msgTime:nTime
            })
            this.setState({message: ''});

        }
    }
    render(){
        
        return (
            <div>
               
            <div className="chatbubbles">
                {
                    this.state.messages.map((message,i) => 
                    {
                   
                        if(this.state.sockId === message.sockId)
                        {
                            return (
                                    <div className="user2" key={i}>
                                        <div className="info">
                                            <span className="user">{ message.author }</span>
                                            <span className="time">{ message.msgTime }</span>
                                        </div>
                                        <div className="speech-bubble">{message.message}</div>
                                    </div>
                                )
                        }
                        else
                        {
                            return (
                                    <div className="user1" key={i}>
                                        <div className="info">
                                            <span className="user">{ message.author }</span>
                                            <span className="time">{ message.msgTime }</span>
                                        </div>
                                        <div className="speech-bubble">{message.message}</div>
                                    </div>
                                )
                        }
                    })
                }
                
            </div>
            <div className="messenger">
                <div className="container-fluid">
                    <div className="row no-gutters">
                        <div className="col-11">
                            <textarea value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}></textarea>
                        </div>
                        <div className="col-1 text-center">
                            <button onClick={this.sendMessage} className="send-msg">
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Chat;