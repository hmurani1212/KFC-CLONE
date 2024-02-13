import './App.css';
import Home from "./Component/Home";
import Navbar from "./Component/Navbar";
import OrderDetails from './Component/OrderDetails';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './Admin/Admin';
import Sign from './Component/Sign';
import Login from './Component/Login';
import Profile from './Component/Profile';
import Delivery from './Delivery/Delivery';
import Footer from './Component/Footer';
import KommunicateChat from './chatBoat/KommunicateChat';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="OrderDetails" element={<OrderDetails />} />
          <Route path="Admin" element={<Admin />} />
          <Route path="Sign" element={<Sign />} />
          <Route path="Login" element={<Login />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Delivery" element={<Delivery />} />
          <Route path="Footer" element={<Footer />} />
          <Route path="KommunicateChat" element={<KommunicateChat />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
