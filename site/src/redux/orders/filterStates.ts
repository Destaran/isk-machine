import { createSelector } from '@reduxjs/toolkit';
import {
  excludeNullSecFilter,
  excludeLowSecFilter,
  excludeHighSecFilter,
  excludeStationsFilter,
  excludeStructuresFilter,
  locationFilter,
  regionFilter,
  marketHubsFilter,
} from './ordersSlice';

export const filterStates = createSelector(
  [
    excludeNullSecFilter,
    excludeLowSecFilter,
    excludeHighSecFilter,
    excludeStationsFilter,
    excludeStructuresFilter,
    locationFilter,
    regionFilter,
    marketHubsFilter,
  ],
  (
    excludeNullSecFilter,
    excludeLowSecFilter,
    excludeHighSecFilter,
    excludeStationsFilter,
    excludeStructuresFilter,
    locationFilter,
    regionFilter,
    marketHubsFilter
  ) => {
    return {
      excludeNullSecFilter: excludeNullSecFilter.active,
      excludeLowSecFilter: excludeLowSecFilter.active,
      excludeHighSecFilter: excludeHighSecFilter.active,
      excludeStationsFilter: excludeStationsFilter.active,
      excludeStructuresFilter: excludeStructuresFilter.active,
      locationFilter: locationFilter,
      regionFilter: regionFilter,
      marketHubsFilter: marketHubsFilter.active,
    };
  }
);
