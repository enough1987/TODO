
import { getAllTasksApi } from "@/api/tasks";
import { POST_EDIT_LIST_HEADERS } from "@/api/dictioneries";
import { ListItems } from "./listItems";
import ClickOutside from "./clickOutside";
import Box from "@mui/material/Box";

export async function TaskList() {
    const data = await getAllTasksApi();

    const listHeaders = <li
    className="w-full flex items-center justify-between">
        <Box 
          role="listheader"
          className="flex w-[800px] ml-[30px]">
          { 
            POST_EDIT_LIST_HEADERS.map((item) => (<Box key={item.label} 
              sx={{ width: item.width }} 
              className="truncate">
                {item.label}
            </Box> ))
          }
        </Box>
    </li>

    return (
      <ClickOutside>
        <ul 
          role="list"
          className="w-5/6 space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {listHeaders}
            <ListItems items={data} />
        </ul>
      </ClickOutside>
    );
  }
  