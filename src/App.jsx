import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserSettingsForm from "./UserSettingsForm";

export default function App(){
    return(  
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<UserSettingsForm/>}/>
    </Routes>
    </BrowserRouter>)
}