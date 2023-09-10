import { useEffect, useState } from "react"

import {DragDropContext, Droppable, Draggable} from '@hello-pangea/dnd'

const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
  {id: 1, text: 'aprender react 1'},
  {id: 2, text: 'aprender react 2'},
  {id: 3, text: 'aprender react 3'}  
] 

const App = () => {

  const [todos, setTodos] = useState(initialTodos)

  useEffect(() => {
    localStorage.setItem('todos' , JSON.stringify(todos))
  }, [todos])

  const handleDragEnd = (result) => {
    if(!result.destination) return
      console.log(result)
      const startIndex = result.source.index
      const endIndex = result.destination.index

      const copyArray = [...todos]
      const [reorderItem] = copyArray.splice(startIndex, 1)
      
      copyArray.splice(endIndex, 0, reorderItem)

      setTodos(copyArray)
      
  } 

  return (
    <div className="text-center text-5xl">
    <h1>Todo App</h1>
    <div className="flex justify-center items-center">
    
    
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
      {
        (droppableProvider) => (
          <ul
            className="inline-block text-3xl border-2 border-black p-4"
            ref={droppableProvider.innerRef}
            {...droppableProvider.droppableProps}
          >
          {todos.map((todo, index) => (
            <Draggable
              key={todo.id}
              index={index}
              draggableId={`${todo.id}`}
            >
            {(draggableProvider) => (
              <li
                className="border-2 border-black p-4 mb-2"
                ref={draggableProvider.innerRef}
                {...draggableProvider.draggableProps}
                {...draggableProvider.dragHandleProps}
              >
                {todo.text}
              </li>
                        )}
                    </Draggable>
                ))}
                {droppableProvider.placeholder}
            </ul>
        )}
    </Droppable>
  </DragDropContext>
  </div>           
  </div>
  )
}
export default App