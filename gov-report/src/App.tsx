import "./css/App.css";
import 'leaflet/dist/leaflet.css';

// Router
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTES } from "./config/Routing";
import { isDesktopApp } from "./utils/platform";

// Layouts
import PublicLayout from "./layouts/public/PublicLayout";
import AuthLayout from "./layouts/auth/AuthLayout";
import MainLayout from "./layouts/main/MainLayout";

// Views
import Home from "./views/home/Home";
import About from "./views/about/About";
import Download from "./views/download/Download";

// Auth Views
import Login from "./views/auth/login/Login";
import Register from "./views/auth/register/Register";
import ForgotPassword from "./views/auth/forgotPassword/ForgotPassword";

// Main Views
import Overview from "./views/main/overview/Overview";
import Agencies from "./views/main/agencies/Agencies";
import GisBoundaries from "./views/main/gisBoundaries/GisBoundaries";
import Sla from "./views/main/sla/Sla";
import Accounts from "./views/main/accounts/Accounts";
import Incidents from "./views/main/incidents/Incidents";
import AuditLogs from "./views/main/auditLogs/AuditLogs";

function App() {
  const isDesktop = isDesktopApp();

  return (
    <Routes>
      {/* 
        Phân tách Route theo Nền Tảng:
        - Trên Desktop App (Tauri): 3 trang HOME, ABOUT, DOWNLOAD không hiển thị và tự động chuyển hướng về /login.
        - Trên Web: Hiển thị đầy đủ cả 14 trang với root là HOME (/).
      */}
      {isDesktop ? (
        <>
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
          <Route path={ROUTES.ABOUT} element={<Navigate to={ROUTES.LOGIN} replace />} />
          <Route path={ROUTES.DOWNLOAD} element={<Navigate to={ROUTES.LOGIN} replace />} />
        </>
      ) : (
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.DOWNLOAD} element={<Download />} />
        </Route>
      )}

      {/* Auth Pages */}
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path="/forgotPassword" element={<Navigate to={ROUTES.FORGOT_PASSWORD} replace />} />
      </Route>

      {/* Main Authenticated Pages */}
      <Route path={ROUTES.MAIN} element={<MainLayout />}>
        <Route index element={<Overview />} />
        <Route path="overview" element={<Navigate to={ROUTES.MAIN} replace />} />
        <Route path="agencies" element={<Agencies />} />
        <Route path="gis-boundaries" element={<GisBoundaries />} />
        <Route path="sla" element={<Sla />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="audit-logs" element={<AuditLogs />} />
      </Route>

      {/* Catch-all Fallback Route */}
      <Route
        path="*"
        element={<Navigate to={isDesktop ? ROUTES.LOGIN : ROUTES.HOME} replace />}
      />
    </Routes>
  );
}

export default App;
