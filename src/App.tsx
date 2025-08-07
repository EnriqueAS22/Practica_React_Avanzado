import LoginPage from "./pages/auth/login-page";
import Layout from "./components/layout/layout";
import AdvertsPage from "./pages/advert/adverts-page";
import { Navigate, Route, Routes } from "react-router";
import NewAdvertPage from "./pages/advert/new-advert-page";
import RequiredAuth from "./pages/auth/required-auth";
import AdvertPage from "./pages/advert/advert-page";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/adverts" element={<Layout />}>
        <Route
          index
          element={
            <RequiredAuth>
              <AdvertsPage />
            </RequiredAuth>
          }
        />
        <Route
          path=":advertId"
          element={
            <RequiredAuth>
              <AdvertPage />
            </RequiredAuth>
          }
        />
        <Route
          path="new"
          element={
            <RequiredAuth>
              <NewAdvertPage />
            </RequiredAuth>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to="/adverts" />} />
      <Route path="/404" element={<div>404 | Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
