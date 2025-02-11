'use client'

import { ITask } from "@/api/dictioneries";
import { completeTaskApi } from "@/api/tasks";
import FormIcon from "@/components/formIcon";
import { useStoreInContext } from "@/store/storeProvider";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface IProps {
    task: ITask;
}

export function CompleteTask({ task }: IProps) {
    const setPendingGlocal = useStoreInContext((state) => state.setPendingGlocal);
    const editable = useStoreInContext((state) => state.editable);

    return (
        <FormIcon 
        disabled={!!Object.keys(editable || {}).length || task.completed}
        label={`Complete task ${task.name}`}
        onClick={async () => { 
            setPendingGlocal(true);
            await completeTaskApi(task);
            setPendingGlocal(false);
        }}
    
        >
            <CheckCircleOutlineIcon />         
        </FormIcon>
    );
}
