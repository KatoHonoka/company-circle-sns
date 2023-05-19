import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
// ヘッダー
import Header from './components/Header';
// userフォルダ
import UserDetail from './user';
import UserPost from './user/post';
import Login from './user/login';

// eventフォルダ
import EventDetail from './event/[id]';
import EventCreate from './event/create';
import EventEdit from './event/edit';
import EventForum from './event/forum';
import EventPost from './event/post';

// islandフォルダ
import IslandDetail from './island/[id]';
import IslandEdit from './island/edit';
import EventAll from './island/eventAll';
import IslandForum from './island/forum';
import IslandCreate from './island/create';
import IslandMenbers from './island/menbers';
import IslandPost from './island/post';

// searchフォルダ
import Search from './search';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          {/* userフォルダ */}
          <Route path="/user" element={<UserDetail />} />
          <Route path="/user/post" element={<UserPost />} />
          <Route path="/user/login" element={<Login />} />

          {/* searchフォルダ */}
          <Route path="/search" element={<Search />} />

          {/* islandフォルダ */}
          <Route path="/island/:id" element={<IslandDetail />} />
          <Route path="/island/create" element={<IslandCreate />} />
          <Route path="/island/edit" element={<IslandEdit />} />
          <Route path="/island/eventAll" element={<EventAll />} />
          <Route path="/island/forum" element={<IslandForum />} />
          <Route path="/island/menbers" element={<IslandMenbers />} />
          <Route path="/island/post" element={<IslandPost />} />

          {/* eventフォルダ */}
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/event/create" element={<EventCreate />} />
          <Route path="/event/edit" element={<EventEdit />} />
          <Route path="/event/forum" element={<EventForum />} />
          <Route path="/event/post" element={<EventPost />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
