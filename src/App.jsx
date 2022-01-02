import "@fortawesome/fontawesome-free/js/all.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SearchBar from "./components/search-bar";
import Popular from "./pages/popular/popular";
import Video from "./pages/video/video";
import { Youtube } from "./services/youtube";

const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

const App = () => {
  return (
    <BrowserRouter>
      <SearchBar youtube={youtube}></SearchBar>
      <Routes>
        <Route path="/" element={<Popular youtube={youtube} />}></Route>
        <Route path=":id" element={<Video youtube={youtube} />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
