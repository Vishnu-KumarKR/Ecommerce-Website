import React from 'react';
import { Outlet } from 'react-router-dom';

export default function App() {
  return <div style={{margin:0, padding:0, width:'100%', minWidth:0, boxSizing:'border-box', overflowX:'hidden'}}><Outlet /></div>;
}

 
