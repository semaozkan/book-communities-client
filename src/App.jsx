import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Loading from "./components/loading/Loading";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Audiobooks from "./pages/audiobooks/Audiobooks";
import Communities from "./pages/communities/Communities";
import BookDetail from "./pages/bookDetail/BookDetail";
import SingleCommunity from "./pages/singleCommunity/SingleCommunity";
import BookDonation from "./pages/bookDonation/BookDonation";
import SummaryDetail from "./pages/summaryDetail/SummaryDetail";
import AddSummary from "./pages/addSummary/AddSummary";
import Favorites from "./pages/favorites/Favorites";
import Meet from "./pages/meet/Meet";
import Footer from "./components/footer/Footer";
import About from "./pages/about/About";
import Profile from "./pages/profile/Profile";
import Notification from "./pages/notification/Notification";
import Messages from "./pages/messages/Messages";
// import { IoSettings } from "react-icons/io5";
import Settings from "./pages/settings/Settings";
import DonationTracking from "./pages/donationTracking/DonationTracking";
import ListenAudioBook from "./pages/ListenAudioBook/ListenAudioBook";

import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { user } = useAuth();
  return user && user.user ? <Outlet /> : <Navigate to="/login" replace />;
}

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 800); // min. 800ms loading
    return () => clearTimeout(timeout);
  }, [location.pathname]);
  if (loading) return <Loading />;
  return (
    <>
      <div className="main">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/audiobooks" element={<Audiobooks />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
            <Route
              path="/community/:communityId"
              element={<SingleCommunity />}
            />
            <Route path="/bookDonation" element={<BookDonation />} />
            <Route
              path="/bookDonation/:donationId"
              element={<DonationTracking />}
            />
            <Route
              path="/book/:bookId/summaries/:summaryId"
              element={<SummaryDetail />}
            />
            <Route
              path="/book/:bookId/summaries/add"
              element={<AddSummary />}
            />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="book/listen/:bookId" element={<ListenAudioBook />} />
            <Route path="/meet/:meetId" element={<Meet />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Routes>
        {!location.pathname.startsWith("/meet/") && <Footer />}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
