import type { Task } from "@/lib/types";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TaskForm = ({ onSave, onCancel, defaultValue }: {
    onSave: (task: Task) => void;
    onCancel: () => void;
    defaultValue?: Task | null;
  }) => {
    const [name, setName] = useState(defaultValue?.name || "");
    const [status, setStatus] = useState(defaultValue?.status || "To Do");
    const [priority, setPriority] = useState(defaultValue?.priority || "Medium");
  
    function handleSubmit() {
      if (!name.trim()) return;
      onSave({
        id: defaultValue?.id || crypto.randomUUID(),
        name: name.trim(),
        status,
        priority,
        createdAt: defaultValue?.createdAt || new Date().toLocaleString(),
      });
    }
  
    return (
      <div className="space-y-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Task Name" />
        <div className="flex gap-4">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded">
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    );
  }
  
export default TaskForm;