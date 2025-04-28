import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Audiobooks from "./pages/audiobooks/Audiobooks";
import Communities from "./pages/communities/Communities";
import BookDetail from "./pages/bookDetail/BookDetail";
import SingleCommunity from "./pages/singleCommunity/SingleCommunity";
import BookDonation from "./pages/bookDonation/BookDonation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/audiobooks" element={<Audiobooks />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/community" element={<SingleCommunity />} />
          <Route path="/bookDonation" element={<BookDonation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
