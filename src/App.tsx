/** @format */

import { Navigate, Route, Routes } from "react-router-dom";
import { MAIN_PAGES } from "./model/routes/panel";
import { HomeModule } from "./modules/home/home";

function App() {
  return (
    <Routes>
      <Route path={MAIN_PAGES.home} element={<HomeModule />} />
      <Route path="/*" element={<Navigate to={MAIN_PAGES.home} replace />} />
    </Routes>
  );
}

export default App;
