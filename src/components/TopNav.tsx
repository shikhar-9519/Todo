import React, { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from './ui/menubar';
import type { UserCreds } from '@/lib/types';

const TopNav = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState<UserCreds | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    } else {
      setCurrentUser(null);
    }
  }, []);

  const getInitials = useMemo(() => {
    if (currentUser) {
      return `${currentUser.firstName[0]}${currentUser.lastName[0]}`;
    }
    return "";
  }, [currentUser])

  return (
      <div className="flex items-center justify-between bg-white shadow-md p-4 sticky top-0 left-0 right-0 z-10">
        <div className='flex items-center'>
        <img src="/images/todo-logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <Link to={`/todos`} className="text-2xl font-bold">
        Todo</Link>
            </div>
        {currentUser ? <Menubar style={{border: "none"}}>
  <MenubarMenu>
    <MenubarTrigger><div className='rounded-full bg-[#e81111] p-2 text-white font-bold'>
        {getInitials}
        </div></MenubarTrigger>
    <MenubarContent>
      <MenubarItem disabled>
        User Account
      </MenubarItem>
      <MenubarItem>
        <div className='flex items-center gap-2'>
        <div className='rounded-full bg-[#f2c4c4] p-2 text-[#D52121] font-bold'>
        {getInitials}
        </div>
        <div>
          <div className='font-bold'>{currentUser.firstName}{" "}{currentUser.lastName}</div>
          <div>{currentUser.email}</div>
        </div>
        </div>
      </MenubarItem>
      <MenubarSeparator />
      <MenubarItem onClick={() => {
        localStorage.removeItem("currentUser");
        navigate("/");
      }}>Logout</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar> : null}
      </div>
  )
}

export default TopNav
