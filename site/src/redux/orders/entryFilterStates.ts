import { createSelector } from '@reduxjs/toolkit';
import { locationFilter, regionFilter } from './ordersSlice';

export const entryFilterStates = createSelector(
  [locationFilter, regionFilter],
  (locationFilter, regionFilter) => {
    return {
      locationFilter: locationFilter.active,
      regionFilter: regionFilter.active,
    };
  }
);
