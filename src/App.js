import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './broadcast.js'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Sidebar from "./Sidebar";
import RequestForm from './broadcastform'
import FileUpload from './FileUpload'
import { registerIVSTech } from 'amazon-ivs-player';

function onClick(e, item) {
	window.navigate();
}


const items = [
   { name: "Events Calendar", label: "Events Calendar", 
     items: [
     	{ name: "offline events", label: "Offline Events", onClick },
     	{ name: "broadcast events", label: "Broadcast Events", onClick }
     ]
 },
  {
    name: "live streams",
    label: "Live Streams",
    items: [
      { name: "live stream categories", label: "Live Stream Categories", onClick },
      { name: "live streams", label: "Live Streams", onClick }
    ]
  }
];

function App() {
  return (
    <div className="App">
      <Sidebar items={items} />
      <AmplifySignOut />
      <RequestForm />
    </div>



  );
}

export default withAuthenticator(App);
