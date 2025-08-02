import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Error500Page from "./pages/Error500Page";
import RecordsPage from "./pages/RecordsPage";
import AegisPage from "./pages/AegisPage";
import LoginPage from "./pages/LoginPage";
import ForgotPage from "./pages/ForgotPage";
import ResetPage from "./pages/ResetPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot" element={<ForgotPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/records" element={<RecordsPage />} />
        <Route path="/aegis" element={<AegisPage />} />
        <Route path="/500" element={<Error500Page />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
