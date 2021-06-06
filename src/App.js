import './App.css';
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const initialtask = [
  {
    id: "1",
    text: "ejemplo1"
  },
  {
    id: "2",
    text: "ejemplo2"
  },
  {
    id: "3",
    text: "ejemplo3"
  },
  {
    id: "4",
    text: "ejemplo4"
  },
  {
    id: "5",
    text: "ejemplo5"
  },
]

function App() {

  const [tasks, setTask] = useState(initialtask);

  const reorder=(list, startIndex, endIndex)=>{
    const result = [...list];
    const [removed]=result.splice(startIndex, 1);
    result.splice(endIndex,0,removed);

    return result;
  }


  return (
    <DragDropContext onDragEnd={(result) => {
      // (result) => console.log(result)
      const { source, destination } = result;
      if (!destination) return;
      if (source.index === destination.index && destination.droppableId === source.droppableId) return;

      setTask(prevTasks => reorder (prevTasks, source.index, destination.index))

    }}>
      <div className="App">
        <h1>Tareas</h1>
        <Droppable droppableId="tasks">  
          {/*direction="horizontal"  --- if flex direcion is row*/
          (dropableProvided) => (
            <ul
              {...dropableProvided.droppableProps}
              ref={dropableProvided.innerRef}
              className="task-container"
            >
              {
                tasks.map((task, index) =>
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(draggableProvider) => (
                      <li
                        {...draggableProvider.draggableProps}
                        ref={draggableProvider.innerRef}
                        {...draggableProvider.dragHandleProps}
                        className="item" >{task.text}</li>
                    )}
                  </Draggable>
                )
              }
              {dropableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
