'use client'

import FormIcon from '@/components/formIcon';
import { useStoreInContext } from '@/store/storeProvider';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
    id: string;
}

export function EditTaskIcon({ id }: IProps) {
    const editable = useStoreInContext((state) => state.editable);
    const setEditableOne = useStoreInContext((state) => state.setEditableOne);

    return (
        <FormIcon 
            label={`Edit task ${id}`}
            onClick={() => {
              setEditableOne(id, !editable[id])
            }}
        >
            <EditIcon />
        </FormIcon>
    );
}
