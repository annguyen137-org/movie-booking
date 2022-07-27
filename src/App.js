import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import MovieDetail from "pages/MovieDetail/MovieDetail";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import Register from "pages/Register/Register";
import HomeTemplate from "template/HomeTemplate/HomeTemplate";
import Purchase from "pages/Purchase/Purchase";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<Home />} />

          <Route path="/detail/:movieId" element={<MovieDetail />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/purchase">
          <Route path=":showtimeId" element={<Purchase />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
