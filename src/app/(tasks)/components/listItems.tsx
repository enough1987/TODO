"use client";

import { ITask } from '@/api/dictioneries';
import { EditTask } from './editTask';
import { EditTaskIcon } from './editITaskIcon';
import { CompleteTask } from './completed';
import { DeleteTask } from './deleteTask';
import { filter, useFilters } from '../utils/filters';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Box from '@mui/material/Box';

const sortByCreated = (a: ITask, b: ITask) => (new Date(b.created)).getTime() - (new Date(a.created)).getTime();
const sortByComleted = (a: ITask, b: ITask) => (a.completed === b.completed) ? 0 : (a.completed ? 1 : -1)

interface ListItemsProps {
    items: ITask[];
}

export function ListItems ({ items }: ListItemsProps) {
    const [filters] = useFilters();
    
    const listItems = items
          ?.filter((item) => filter(filters, item ))
          .sort(sortByCreated).sort(sortByComleted)
          .map((item) => <li key={item.id}
            role="listitem"
            className="w-full flex items-center justify-between">
        <Box className="flex items-center"
        sx={{ width: '1rem' }}>
          <CheckCircleOutlineOutlinedIcon 
              fontSize='small'
              color={item.completed ? 'success' : 'disabled'}
            />
            <EditTask task={item} />
        </Box>
        <Box className=" flex cursor-pointer">
            <EditTaskIcon id={item.id}/>
            <Box className="w-2"></Box>
            <CompleteTask task={item} />
            <Box className="w-2"></Box>
            <DeleteTask id={item.id} />
        </Box>
    </li>);

    return <>
        {listItems}
    </>
};