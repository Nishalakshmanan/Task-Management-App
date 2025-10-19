
import Header from "../components/Header.jsx";
import TaskForm from "../components/TaskForm.jsx";
function CreateTask() {
  
  return (
    <div>
      <Header create={false}></Header>
      <TaskForm></TaskForm>
    </div>
  );
}
export default CreateTask;
