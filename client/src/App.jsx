import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import { Logo } from './components/Logo'
import { AdminPanel } from './pages/AdminPanel'
import { Navbar } from './components/Navbar'
import { EmployeeList } from './components/EmployeeList'
import { AddEmployee } from './components/AddEmployee'
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/dashboard" element={<Navbar />}>
            <Route path="" element={<AdminPanel />} />
            <Route path="emplist" element={<EmployeeList />} />
            <Route path="addemployee" element={<AddEmployee />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
