import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "pages/Home/Home";
import Login from "pages/Login/Login";
import MovieDetail from "pages/MovieDetail/MovieDetail";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import Register from "pages/Register/Register";
import HomeTemplate from "template/HomeTemplate/HomeTemplate";
import Purchase from "pages/Purchase/Purchase";
import PurchaseTemplate from "template/PurchaseTemplate/PurchaseTemplate";

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
        <Route path="/purchase" element={<PurchaseTemplate />}>
          <Route path=":showtimeId" index element={<Purchase />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
