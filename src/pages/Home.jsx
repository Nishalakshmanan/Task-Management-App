import Header from "../components/Header.jsx";
import Search from "../components/Search.jsx";
import Table from "../components/Table.jsx";
import { createContext, useEffect } from "react";
import { useState } from "react";
const filterContext=createContext()
function Home() {
    const [searchInput,setSearchInput]=useState("")
    const [dueDate,setDueDate]=useState("")
    const[priority,setPriority]=useState("")
  return (
    <div>
      <Header create={true} ></Header>
      <filterContext.Provider value={{searchInput,setSearchInput,dueDate,setDueDate,priority,setPriority}}>
        <Search></Search>
        <Table></Table>
      </filterContext.Provider>     
    </div>
  );
}
export default Home
export {filterContext}