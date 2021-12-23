import "@fortawesome/fontawesome-free/js/all.js";
import { useRoutes } from "react-router-dom";
import "./App.css";
import Popular from "./pages/popular/popular";
import Video from "./pages/video/video";
import { Youtube } from "./services/youtube";

const youtube = new Youtube(process.env.REACT_APP_YOUTUBE_API_KEY);

const App = () => {
  const routeElem = useRoutes([
    { path: "/", element: <Popular youtube={youtube} /> },
    { path: ":id", element: <Video /> },
  ]);
  return routeElem;
};

export default App;
