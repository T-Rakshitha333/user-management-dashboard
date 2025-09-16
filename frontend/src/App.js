import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import Layout from './components/Layout';


export default function App() {
return (
<Layout>
<Routes>
<Route path="/" element={<UserList />} />
<Route path="/add" element={<UserForm />} />
<Route path="/edit/:id" element={<UserForm />} />
</Routes>
</Layout>
);
}
