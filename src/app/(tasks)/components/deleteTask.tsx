'use client'

import { deleteTaskApi } from "@/api/tasks";
import { FormIcon } from "@/components/formIcon";
import { useStoreInContext } from "@/store/storeProvider";
import DeleteIcon from '@mui/icons-material/Delete';

interface IProps {
    id: string;
}

export function DeleteTask({ id }: IProps) {
    const setPendingGlocal = useStoreInContext((state) => state.setPendingGlocal);
    const editable = useStoreInContext((state) => state.editable);

    return (
        <FormIcon 
            disabled={!!Object.keys(editable || {}).length}
            label={`Delete task ${id}`}
            onClick={async () => { 
                setPendingGlocal(true);
                await deleteTaskApi(id);
                setPendingGlocal(false);
            }}
        
        >
            <DeleteIcon />         
        </FormIcon>
    );
}