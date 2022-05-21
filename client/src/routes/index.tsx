import "react";
import { Routes, Route } from "react-router-dom";
import Main from "@pages/Main";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}></Route>
    </Routes>
  );
};

export default AppRoutes;
