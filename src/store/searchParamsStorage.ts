/* eslint-disable @typescript-eslint/no-unused-vars */
import { filterNames, FILTERS_NAMES } from '@/api/dictioneries';
import { PersistStorage, StorageValue } from 'zustand/middleware/persist';
import { IFiltersState } from './store';

const updateFiltersSearchParams = (searchParams: URLSearchParams) => {
  window.history.replaceState(
    {},
    '',
    `${location.pathname}?${searchParams.toString()}`,
  )
}

export const searchParamsStorage: PersistStorage<IFiltersState> = {
  getItem: async (_name: string) => {
    const url = new URL(window.location.href)

    const filters: { [key: filterNames]: string | null } = {};
    FILTERS_NAMES.forEach((key) => {
      const value = url.searchParams.get(key);
      filters[key] = value || '';
    });

    return { state: { filters } } as StorageValue<IFiltersState>;
  },
  setItem: async (_name: string, value: StorageValue<IFiltersState>) => {
    const url = new URL(window.location.href)
    const filters = value?.state?.filters;

    for (const key in filters) {
      if(filters?.[key]) {
        url.searchParams.set(key, filters[key] as string);
      } else {
        url.searchParams.delete(key);
      }
    }
    if(!Object.keys(filters).length) {
      FILTERS_NAMES.forEach((key) => {
        url.searchParams.delete(key)
      });
    }

    updateFiltersSearchParams(url.searchParams);
  },
  removeItem: async (_name: string) => {
    const url = new URL(window.location.href)
    FILTERS_NAMES.forEach((key) => {
      url.searchParams.delete(key)
    });

    updateFiltersSearchParams(url.searchParams);
  },
};