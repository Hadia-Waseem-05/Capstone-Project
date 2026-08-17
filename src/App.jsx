import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSettingsPage from "./components/UserSettingsPage.jsx";

export default function App(){
    return(  
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<UserSettingsPage/>}/>
    </Routes>
    </BrowserRouter>)
}