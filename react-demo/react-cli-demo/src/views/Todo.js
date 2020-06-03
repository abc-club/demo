import React from 'react'
import Footer from '../components/TODOS/Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import {
  useParams
} from "react-router-dom";
const App = () => {
  let { filter } = useParams();
  console.log(filter)
  return (
  <div>
    <AddTodo />
    <VisibleTodoList filter={filter || 'SHOW_ALL'}/>
    <Footer />
  </div>
)}

export default App