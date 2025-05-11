import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
// import BookPage from "./components/BookPage/BookPage";
import AudioControl from "./components/AudioControl/AudioControl";
import Navbar from "./components/navbar/Navbar";
import Audiobooks from "./pages/audiobooks/Audiobooks";
import Communities from "./pages/communities/Communities";
import BookDetail from "./pages/bookDetail/BookDetail";
import SingleCommunity from "./pages/singleCommunity/SingleCommunity";
import BookDonation from "./pages/bookDonation/BookDonation";
import SummaryDetail from "./pages/summaryDetail/SummaryDetail";
import AddSummary from "./pages/addSummary/AddSummary";
import Favorites from "./pages/favorites/Favorites";
import AudiobookPlayer from "./pages/audiobookPlayer/AudiobookPlayer";
import Meet from "./pages/meet/Meet";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <>
      <div className="main">
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
            <Route
              path="/book/:bookId/summaries/add"
              element={<AddSummary />}
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="book/listen/:bookId" element={<AudiobookPlayer />} />

            <Route path="/meet/:communityId" element={<Meet />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
