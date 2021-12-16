import { Routes, Route, Outlet } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Destination from "./pages/Destination"
import Space from "./pages/Space"
import Crew from "./pages/Crew"
import Header from "./components/Header"
import NotFound from "./components/NotFound"
import Technology from "./pages/Technology"

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
const App = () => {
    return (
        <AnimatePresence>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="destination" element={<Destination />} />
                    <Route path="crew"  element={<Crew />}/>
                    <Route path="technology" element={<Technology />} />
                    <Route index element={<Space />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}
export default App;