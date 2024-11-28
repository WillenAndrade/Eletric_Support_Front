import { Routes, Route } from 'react-router-dom'
import CircuitsForm from './components/CircuitsForm'
import Table from './components/Table'
import ProjectsScreen from './components/ProjectsScreen'
import Home from './components/Home'
import SignUp from './components/SignUp'


const App = () => {
    return(
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/projects' element={<ProjectsScreen/>}/>
                <Route path="/circuits" element={<CircuitsForm/>} />
                <Route path='/table' element={<Table/>} />
            </Routes>
        </div>
    )
}

export default App
