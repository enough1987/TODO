"use client";

import { FILTERS_NAMES, IFilters, ITask } from '@/api/dictioneries';
import { EditTask } from './editTask';
import { EditTaskIcon } from './editITaskIcon';
import { CompleteTask } from './completed';
import { DeleteTask } from './deleteTask';
import { filter } from '../utils/filters';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import Box from '@mui/material/Box';
import { useParamsList } from '@/utils/customHooks';

const sortByCreated = (a: ITask, b: ITask) => (new Date(b.created)).getTime() - (new Date(a.created)).getTime();
const sortByComleted = (a: ITask, b: ITask) => (a.completed === b.completed) ? 0 : (a.completed ? 1 : -1)

interface ListItemsProps {
    items: ITask[];
}

export function ListItems ({ items }: ListItemsProps) {
    const params = useParamsList(FILTERS_NAMES) as unknown as IFilters;
    
    const listItems = items
          ?.filter((item) => filter(params, item ))
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