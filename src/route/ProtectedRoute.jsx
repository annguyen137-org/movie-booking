import PageNotFound from "pages/PageNotFound/PageNotFound";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { bookedSuccess } = useSelector((state) => state.tickets);

  const isAuth = bookedSuccess;
  const location = useLocation();

  return !!isAuth ? <Outlet context={location.state.successTickets} /> : <Navigate to={location.state?.from ?? "/"} />;
};

export default ProtectedRoute;
