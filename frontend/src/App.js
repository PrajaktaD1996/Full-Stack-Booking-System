import { BrowserRouter, Routes, Route } from "react-router-dom";

import Listing from "./pages/Listing";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Listing />} />

        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/booking" element={<Booking />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;