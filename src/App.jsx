import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import { TasksProvider } from "./context/TasksContext";

function App() {
  return (
    <TasksProvider>
      <RouterProvider router={router} />
    </TasksProvider>
  );
}

export default App;
