import { Navigate, Route, Routes } from "react-router-dom";
import { AddVacation } from "../../DataArea/AddVacation/AddVacation";
import { Vacations } from "../../DataArea/Vacations/Vacations";
import { Home } from "../../PagesArea/Home/Home";
import { Unauthorized } from "../../PagesArea/Unauthorized/Unauthorized";
import { Login } from "../../UserArea/Login/Login";
import { Register } from "../../UserArea/Register/Register";
import { Page404 } from "../Page404/Page404";
import "./Routing.css";
import { Reports } from "../../ReportsArea/Reports/Reports";

export function Routing() {

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />

                <Route path="/vacations" element={<Vacations />} />
                <Route path="/add-vacation" element={<AddVacation />} />
                <Route path="/reports" element={<Reports />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<Navigate to="/unauthorized" />} />
            </Routes>
        </div>
    );
}
