import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './index.css';
import Chat from './Chat';
import Settings from './Settings';


import registerServiceWorker from './registerServiceWorker';


// const Menu = () => {
//    return <div className="topnav">
//       <NavLink to="/" exact activeClassName="active" >Home</NavLink>
//       <NavLink to="/settings" activeClassName="active">Settings</NavLink>
//   </div>

// }

// const routing = (
//     <Router>
//       <div>
//         <Menu />
//         <Route exact path="/" component={Chat} />
//         <Route path="/settings" component={Settings} />
//       </div>
//     </Router>
//   );
ReactDOM.render(<Chat />, document.getElementById('chatWindow'));
ReactDOM.render(<Settings />, document.getElementById('settingWindow'));

registerServiceWorker();
