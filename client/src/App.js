import { React, useEffect, createContext, useReducer, useContext } from "react";
import { Box } from "@material-ui/core";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

//components
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Detail from './components/post/Detail'
import Create from "./components/post/Create";
import Update from "./components/post/Update";
import Register from "./components/account/Register";
import Login from "./components/account/Login";

//reducer
import { reducer, initialState } from './reducer/userReducer'

export const userContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(userContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({ type: "USER", payload: user });
      navigate('/')
    } else {
      navigate('/login');
    }
  }, [])

  return (
    <Box style={{ marginTop: 64 }}>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/details/:id' element={<Detail />} />
        <Route exact path='/create' element={<Create />} />
        <Route exact path='/update/:id' element={<Update />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </Box>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <userContext.Provider value={{ state: state, dispatch: dispatch }}>
      <BrowserRouter>
        <Header />
        <Routing />
      </BrowserRouter>
    </userContext.Provider>
  )
}

export default App;