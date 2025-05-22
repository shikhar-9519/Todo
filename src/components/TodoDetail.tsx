import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { AlignLeft, Calendar, ChevronsDown, ChevronsUp, CircleArrowRight, Equal, List, Pencil, Trash2 } from "lucide-react";
import TaskForm from "./TaskForm";
import TopNav from "./TopNav";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Checkbox } from "./ui/checkbox";

interface Task {
  id: string;
  name: string;
  status: string;
  priority: string;
  createdAt: string;
}

export default function TodoDetail() {
  const { id } = useParams();
  const [todo, setTodo] = useState<{ id: string; name: string; createdAt: string; tasks: Task[] } | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("todo-lists");
    if (data) {
      const lists = JSON.parse(data);
      const found = lists.find((l: any) => l.id === id);
      if (found) {
        if (!found.tasks) found.tasks = [];
        setTodo(found);
      }
    }
  }, [id]);

  function saveTask(task: Task, checkboxChanged?: boolean) {
    if (!todo) return;
    const updatedTasks = editingTask || checkboxChanged
      ? todo.tasks.map((t) => (t.id === task.id ? task : t))
      : [...todo.tasks, task];

    const updatedTodo = { ...todo, tasks: updatedTasks };
    setTodo(updatedTodo);

    const allTodos = JSON.parse(localStorage.getItem("todo-lists") || "[]");
    const totalTasks = updatedTasks.length;
    const completedTasks = updatedTasks.filter((t) => t.status === "Done").length;
    const newTodos = allTodos.map((t: any) => (t.id === todo.id ? {...updatedTodo, totalTasks, completedTasks} : t));
    localStorage.setItem("todo-lists", JSON.stringify(newTodos));
    setEditingTask(null);
    setShowDialog(false);
  }

  function deleteTask(id: string) {
    if (!todo) return;
    const updatedTasks = todo.tasks.filter((t) => t.id !== id);
    const updatedTodo = { ...todo, tasks: updatedTasks };
    setTodo(updatedTodo);
    const allTodos = JSON.parse(localStorage.getItem("todo-lists") || "[]");
    const newTodos = allTodos.map((t: any) => (t.id === todo.id ? updatedTodo : t));
    localStorage.setItem("todo-lists", JSON.stringify(newTodos));
  }

  if (!todo) return <div className="p-6">Loading...</div>;

  return (
    <>
    <TopNav />
    <div className="p-6 max-w-4xl mx-auto h-[88vh]">
      <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
        ← Back
      </Button>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">{todo.name}</h2>
          <p className="text-sm text-muted-foreground">
            🕒 {todo.createdAt} | 📋 {todo.tasks.length} tasks
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="text-left text-sm text-muted-foreground border-b">
            <tr>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4 inline-flex items-center gap-x-2">
                <AlignLeft size={20} />
                Task Name
              </th>
              <th className="py-2 pr-12">
                <div className="flex items-center gap-x-2">
                <CircleArrowRight size={20} />
                Status
                </div>
              </th>
              <th className="py-2 pr-12 inline-flex items-center gap-x-2">
                <Calendar size={20} />
                Created on
              </th>
              <th className="py-2 pr-12">Priority</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todo.tasks.map((task) => (
              <tr key={task.id} className="border-b text-sm">
                <td className="py-2 pr-4">
                    <Checkbox
                      checked={task.status === "Done"}
                      onCheckedChange={() => {
                        const updatedTask = { ...task, status: task.status === "Done" ? "To Do" : "Done" };
                        saveTask(updatedTask, true);
                      }}
                      />
                </td>
                <td className="py-2 pr-4 break-words">{task.name}</td>
                <td className="py-2 pr-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      task.status === "To Do"
                        ? "bg-gray-200 text-gray-800"
                        : task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-2 pr-4"> {new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(task.createdAt))}</td>
                <td className="py-2 pr-4 ">
                    <div className="inline-flex items-center gap-x-2">{task.priority === "High" && <ChevronsUp color="#FF0000" />}
                    {task.priority === "Medium" && <Equal color="#FFA500" />}
                    {task.priority === "Low" && <ChevronsDown color="#008000" />}
                    <span>{task.priority}</span></div>
                </td>
                <td className="pt-4 py-2 pr-4 flex gap-2 items-center">
                  <button
                    onClick={() => {
                        setEditingTask(task);
                        setShowDialog(true);
                      }}>
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteTask(task.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="text-red-500 hover:text-red-600 mt-2">+ Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
            <DialogTitle><div className="flex gap-2 items-center"><List color={"#D52121"}/>Task Details</div></DialogTitle>
            </DialogHeader>
            <TaskForm
              onSave={saveTask}
              onCancel={() => {
                setEditingTask(null);
                setShowDialog(false);
              }}
              defaultValue={editingTask}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </>
  );
}