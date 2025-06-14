import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import MoreDetails from "./pages/MoreDetails";
import Bag from "./pages/MoreDetails/Bag";
import ScrollToTop from "./ScrollToTop";
import NewPublication from "./pages/NewPublication";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more-details" element={<MoreDetails />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/new-publication" element={<NewPublication />} />
      </Routes>
    </BrowserRouter>
  );
}
