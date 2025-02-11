import { AddTask } from "@/app/(tasks)/components/addTask";
import { TaskList } from "@/app/(tasks)/components/taskList";
import { TaskCompleted } from "@/app/(tasks)/components/tasksCompleted";
import { FormFilters } from "./(tasks)/components/formFilters";
import Box from "@mui/material/Box";

export default function Home() {

  return (
    <Box 
      role="main"
      className="flex flex-col">
      <Box role="toolbar" className="pt-2 pl-10"> 
        <TaskCompleted />
        <FormFilters />
      </Box>
      <Box 
        role="section"
        className="w-full p-10 flex justify-between">
        <TaskList />
        <Box role="aside">
          <AddTask />
        </Box>
      </Box>
    </Box>
  );
}
