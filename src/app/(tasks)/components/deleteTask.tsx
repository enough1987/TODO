'use client'

import { toastCofig } from "@/api/dictioneries";
import { deleteTaskApi } from "@/api/tasks";
import FormIcon from "@/components/formIcon";
import { useStoreInContext } from "@/store/storeProvider";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";

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
                try {
                    await deleteTaskApi(id);
                } catch (error) {
                    toast.error(error as string, toastCofig)
                } finally { 
                    setPendingGlocal(false);
                }
            }}
        
        >
            <DeleteIcon />         
        </FormIcon>
    );
}