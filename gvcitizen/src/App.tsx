import type React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { IonApp, setupIonicReact } from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"

// Config
import { ROUTES } from "./config/Routing"

// Views
import Login from "./views/auth/Login"
import Register from "./views/auth/Register"
import ForgotPassword from "./views/auth/ForgotPassword"
import Home from "./views/home/Home"
import Map from "./views/map/Map"
import Reports from "./views/reports/Reports"
import CreateReport from "./views/reports/CreateReport"
import Notifications from "./views/notifications/Notifications"
import Profile from "./views/profile/Profile"

// Layout
import MainLayout from "./layouts/mainLayout/MainLayout"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/* Theme variables and Tailwind CSS */
import "./theme/variables.css"

setupIonicReact({
    mode: "md",
})

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <Routes>
                    {/* Auth routes */}
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path={ROUTES.REGISTER} element={<Register />} />
                    <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />

                    {/* Field Report & Notification Center - Mobile Stack views */}
                    <Route path={ROUTES.REPORT_NEW} element={<CreateReport />} />
                    <Route path={ROUTES.ANONYMOUS_REPORT} element={<CreateReport />} />
                    <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />

                    {/* Main Layout routes with Persistent Top Header & Bottom Tab Navigation */}
                    <Route element={<MainLayout />}>
                        <Route path={ROUTES.HOME} element={<Home />} />
                        <Route path={ROUTES.MAP} element={<Map />} />
                        <Route path={ROUTES.REPORTS} element={<Reports />} />
                        <Route path={ROUTES.PROFILE} element={<Profile />} />
                    </Route>

                    {/* Default redirect to Login */}
                    <Route path={ROUTES.MAIN} element={<Navigate to={ROUTES.HOME} replace />} />
                    <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
                    <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
                </Routes>
            </IonReactRouter>
        </IonApp>
    )
}

export default App
