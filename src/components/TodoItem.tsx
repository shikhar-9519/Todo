import React, { useState } from 'react'
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { TodoItemDetail } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';

interface TodoItemInterface {
  detail: TodoItemDetail,
  deleteList: (id: string) => void;
}

const TodoItem = ({detail, deleteList}: TodoItemInterface) => {
  const [showDialog, setShowDialog] = useState(false);
  const percentage = (detail.completedTasks / detail.totalTasks) * 100;

  return (
    <Card className="flex flex-row items-center justify-between p-4 w-full">
      <div className="flex items-center gap-4">
        <div className=" w-18 h-18 custom-progressbar">
        <CircularProgressbar
        value={percentage}
        text={`${Math.round(percentage)}%`}
        styles={buildStyles({
          textSize: "28px",
          textColor: "#D52121",
          pathColor: "#D52121",
          trailColor: "rgba(213, 33, 33, 0.2)",
          pathTransitionDuration: 0.5
        })}
      />
        </div>
        <div className='flex flex-col items-start'>
        <Link to={`/todos/${detail.id}`} className="font-semibold text-base hover:underline">
            {detail.name}
        </Link>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span>🕒 {detail.createdAt}</span>
            <span className="border-l pl-2">📋 {detail.completedTasks ? `${detail.completedTasks}/${detail.totalTasks} task completed` : `${detail.totalTasks} task${detail.totalTasks > 1 ? 's' : ''} added`}</span>
          </p>
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
          <Button variant="secondary" size="icon">
            <Trash2 className="h-10 w-10" />
          </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
            <DialogTitle><div className="flex gap-2 items-center"><Trash2 color={"#D52121"}/>Are you sure want to delete this List?</div></DialogTitle>
            </DialogHeader>
            
              <h2>This action cannot be undone. All tasks associated with this list will be lost.</h2>
            <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={()=>setShowDialog(false)}>Cancel</Button>
          <Button variant="destructive" onClick={()=>{
            deleteList(detail.id);
            setShowDialog(false);
          }}>Delete List</Button>
        </div>
          </DialogContent>
        </Dialog>
    </Card>
  )
}

export default TodoItem
