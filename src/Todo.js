import { useState } from "react"
import {
  ListItem,
  ListItemText,
  IconButton,
  Button,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core"
import { DeleteForever } from "@material-ui/icons"

import { db } from "./firebase"
import "./Todo.css"

const Todo = props => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState(props.todo.todo)

  const updateTodo = event => {
    event.preventDefault()
    db.collection("todos")
      .doc(props.todo.id)
      .set({ todo: input }, { merge: true })

    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onClose={e => setOpen(false)}>
        <DialogTitle>
          <Typography variant="h4">I am a Dialog</Typography>
        </DialogTitle>
        <DialogContent>
          <form>
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={!input}
            />
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              onClick={updateTodo}
            >
              Update Todo
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <ListItem>
        <ListItemText primary={props.todo.todo} secondary="Dummy deadline" />
        <Button
          style={{ background: "green", color: "white" }}
          variant="contained"
          onClick={e => setOpen(true)}
        >
          Edit Me
        </Button>
        <IconButton
          onClick={e => db.collection("todos").doc(props.todo.id).delete()}
        >
          <DeleteForever fontSize="large" color="secondary" />
        </IconButton>
      </ListItem>
    </>
  )
}

export default Todo
