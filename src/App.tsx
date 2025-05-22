// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/todos" element={<TodoList />} />
      <Route path="/todos/:id" element={<TodoDetail />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/signup" />} />
    </Routes>
  );
}
