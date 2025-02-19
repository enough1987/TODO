import { COMPLETNES, FilterNamesKeys, IFilters, ITask } from "@/api/dictioneries";


    const filterSelectBoolean = <T>(filters: IFilters, item: T, key: keyof T & FilterNamesKeys) => {
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

    const filterSelectString = <T>(filters: IFilters, item: T, key: keyof T & FilterNamesKeys) => {
        if (
            !filters?.[key] ||
            filters?.[key] === 'all' ||
            filters?.[key] === item[key]
        ) {
            return true;
        }
        return false;
    }

    const filterInput = <T>(filters: IFilters, item: T, key: keyof T & FilterNamesKeys) => {
        if (
            !filters?.[key] ||
            (item[key] as string)?.includes(filters[key] as string)
        ) {
            return true;
        }
        return false;
    }

    const filterDateFrom = <T>(filters: IFilters, item: T, key: keyof T & FilterNamesKeys) => {
        if (
            !filters?.from ||
            filters?.from < item[key]
        ) {
            return true;
        }
        return false;
    }

    const filterDateTo = <T>(filters: IFilters, item: T, key: keyof T & FilterNamesKeys) => {
        if (
            !filters?.to ||
            filters?.to > item[key]
        ) {
            return true;
        }
        return false;
    }


    

    export const filter = (filters: IFilters, item: ITask) => {
        if(filterSelectBoolean(filters, item, 'completed') 
          && filterSelectString(filters, item, 'priority')
          && filterInput(filters, item, 'name')
          && filterDateFrom(filters, item, 'due_date')
          && filterDateTo(filters, item, 'due_date')
        ) {
            return true;
        } 
        return false
    }