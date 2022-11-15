import logo from './logo.svg';
//import Register from './pages/Register';
//import Home from './pages/Home';
//import Login from './pages/Login';

import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';

function App() {

  // return (
  //   <div className="App">
  //         <BrowserRouter>
  //           <Routes>
  //             <Route path="/dashboard" element={<Home />} />
  //             <Route path="/" element={<Login />} />
  //             <Route path="/register" element={<Register />} />
  //           </Routes>
  //       </BrowserRouter>
  //   </div>

  // );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* protect these routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="editor" element={<Editor />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
