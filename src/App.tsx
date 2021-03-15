import { Header } from "./components/Header";
import { TaskList } from "./components/TaskList";
import "./styles/global.scss";

export function App() {
  return (
    <>
      <Header />
      <TaskList />
    </>
  );
}
