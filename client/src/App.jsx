import { BrowserRouter, Routes, Route } from "react-router-dom"

import SidebarLayout from "./layouts/SidebarLayout"

import Dashboard from "./pages/Dashboard"
import Workers from "./pages/Workers"
import CreateWorker from "./pages/CreateWorker"
import WorkerProfile from "./pages/WorkerProfile"
import Units from "./pages/Units"
import Birthdays from "./pages/Birthdays"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import EditWorker from "./pages/EditWorker"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<SidebarLayout />}>
          <Route index element={<Dashboard />} />

          <Route
            path="workers"
            element={<Workers />}
          />

          <Route
            path="workers/create"
            element={<CreateWorker />}
          />

          <Route
            path="workers/:id"
            element={<WorkerProfile />}
          />

          <Route
            path="units"
            element={<Units />}
          />
          <Route
            path="workers/edit/:id"
            element={<EditWorker />}
          />
          <Route
          path="settings"
          element={<Settings />}
          ></Route>
          <Route
            path="birthdays"
            element={<Birthdays />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}