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
import SummaryDetail from "./pages/summaryDetail/SummaryDetail";
import AddSummary from "./pages/addSummary/AddSummary";
import Favorites from "./pages/favorites/Favorites";

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
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/community" element={<SingleCommunity />} />
          <Route path="/bookDonation" element={<BookDonation />} />
          <Route
            path="/book/:bookId/summaries/:summaryId"
            element={<SummaryDetail />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
