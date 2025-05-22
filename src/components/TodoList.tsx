import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import TopNav from "./TopNav";
import TodoItem from "./TodoItem";

interface TodoList {
  id: string;
  name: string;
  createdAt: string;
  totalTasks: number;
  completedTasks: number;
}

export default function TodoList() {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [newListName, setNewListName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("todo-lists");
    if (data) setLists(JSON.parse(data));
  }, []);

  function addList() {
    if (!newListName.trim()) {
      setError("List name cannot be empty");
      return;
    }
    setError("");
    const newList: TodoList = {
      id: crypto.randomUUID(),
      name: newListName.trim(),
      createdAt: new Date().toLocaleString(),
      totalTasks: 0,
      completedTasks: 0,
    };
    const filterList = lists.filter((l) => l.id !== "temp");
    localStorage.setItem("todo-lists", JSON.stringify([...filterList, newList]));
    setLists([...filterList, newList]);
    setNewListName("");
  }

  function deleteList(id: string) {
    const updatedList = lists.filter((l) => l.id !== id);
    localStorage.setItem("todo-lists", JSON.stringify(updatedList));
    setError("");
    setLists(updatedList);
  }

  return (
    <>
      <TopNav />
      <div className="p-6 max-w-3xl mx-auto h-[88vh]">
        <h2 className="text-2xl font-semibold mb-3">Your To Do Lists</h2>

        {lists.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-10 text-center">
            <img
              src="/images/NoTodos.png"
              alt="illustration"
              className="w-48"
            />
            <p className="text-lg">
              Create your first list and become more productive
            </p>
            <Button
              variant="destructive"
              onClick={() =>
                setLists([{ id: "temp", name: "", createdAt: "", totalTasks: 0, completedTasks: 0 }])
              }
            >
              Add List
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {lists.map((list) => (
              <Card
                key={list.id}
                className="flex items-center justify-between p-4"
              >
                {list.name ? (
                  <TodoItem detail={list} deleteList={deleteList}/>
                ) : (
                  <div className="w-full flex gap-2 items-center">
                    <Input
                      placeholder="Add List Name"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      className={error ? "border-red-500" : ""}
                    />
                    <Button variant="destructive" onClick={addList}>
                      Add
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => deleteList(list.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Card>
            ))}

            {!lists.some((l) => l.name === "") && (
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() =>
                    setLists([
                      ...lists,
                      { id: "temp", name: "", createdAt: "", totalTasks: 0, completedTasks: 0 },
                    ])
                  }
                >
                  + Add another List
                </Button>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </>
  );
}
