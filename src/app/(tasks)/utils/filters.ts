import { COMPLETNES, IFilters, ITask } from "@/api/dictioneries";


    const filterSelectBoolean = (filters: IFilters, item: ITask, key: keyof ITask) => {
        if (
            !filters?.[key] ||
            filters?.[key] === 'all' ||
            (filters?.[key] === COMPLETNES[0] && !!item[key]) ||
            (filters?.[key] === COMPLETNES[1] && !item[key])
        ) {
            return true;
        }
        return false;
    }

    const filterSelectString = (filters: IFilters, item: ITask, key: keyof ITask) => {
        if (
            !filters?.[key] ||
            filters?.[key] === 'all' ||
            filters?.[key] === item[key]
        ) {
            return true;
        }
        return false;
    }

    const filterInput = (filters: IFilters, item: ITask, key: keyof ITask) => {
        if (
            !filters?.[key] ||
            (item[key] as string)?.includes(filters[key] as string)
        ) {
            return true;
        }
        return false;
    }

    export const filter = (filters: IFilters, item: ITask) => {
        if(filterSelectBoolean(filters, item, 'completed') 
          && filterSelectString(filters, item, 'priority')
          && filterInput(filters, item, 'name')
        ) {
            return true;
        } 
        return false
    }