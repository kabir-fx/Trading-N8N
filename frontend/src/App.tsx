import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CreateWorkflow } from "./utils/CreateWorkflow";

 export default function App() {

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<CreateWorkflow />} />
      </Routes>
    </BrowserRouter>
  </div>
}