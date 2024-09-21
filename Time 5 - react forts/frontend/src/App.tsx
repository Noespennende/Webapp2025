import { useState } from 'react'
import './App.css'
import Student from './components/Student'
import Grid from './components/Grid'

function App() {

  const studentList = [{name: "Gandalf", id: "0"}, {name: "Bilbo", id: "1"}, {name: "Gimli", id:"2"}, {name: "Arwen", id:"3"} ]

  return (
    <main>
      <Grid students={studentList}/>
    </main>
  )
}

export default App
