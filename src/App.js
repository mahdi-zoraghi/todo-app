import { useEffect, useState } from "react"
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  List,
  Box,
} from "@material-ui/core"
import firebase from "firebase/app"

import { db } from "./firebase"

import "./App.css"
import Todo from "./Todo"

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
        setTodos(
          snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo }))
        )
      })
  }, [])

  const addTodo = event => {
    event.preventDefault()

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("")
  }

  return (
    <div className="App">
      <h1>Hi</h1>
      <form style={{ display: "flex", justifyContent: "center" }}>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={event => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>

      <Box display="flex" justifyContent="center">
        <List className="todo__list" style={{ flexBasis: "50%" }}>
          {todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </List>
      </Box>
    </div>
  )
}

export default App
