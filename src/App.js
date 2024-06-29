import logo from './logo.svg';
import './App.css'; 
import ForgetPassword from './pages/forget-password';
import Home from './pages/home';
import UserAuthentication from './pages/user-authentication';
import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom';
import NoPageFound from './pages/NoPageFound';
import { RouterProvider } from 'react-router';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserAuthentication />,
    },{
      path: '/products',
      element: <Home />
    },
    {
      path: '/forgot-password',
      element: <ForgetPassword />
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
