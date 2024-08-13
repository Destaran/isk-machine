import { get } from "./Axios";
import {
  GetUniverseAsteroidBeltsAsteroidBeltIdResponse,
  GetUniverseCategoriesResponse,
  GetUniverseCategoriesCategoryIdResponse,
  GetUniverseConstellationsConstellationIdResponse,
  GetUniverseConstellationsResponse,
  GetUniverseFactionsResponse,
  GetUniverseGroupsResponse,
  GetUniverseGroupsGroupIdResponse,
  GetUniverseMoonsMoonIdResponse,
  GetUniversePlanetsPlanetIdResponse,
  GetUniverseRegionsResponse,
  GetUniverseRegionsRegionIdResponse,
  GetUniverseStargatesStargateIdResponse,
  GetUniverseStarsStarIdResponse,
  GetUniverseStationsStationIdResponse,
  GetUniverseStructuresResponse,
  GetUniverseStructuresStructureIdResponse,
  GetUniverseSystemsResponse,
  GetUniverseSystemsSystemIdResponse,
  GetUniverseTypesResponse,
  GetUniverseTypesTypeIdResponse,
} from "../hey-api";

export async function getAsteroidBelt(id: number) {
  return await get<GetUniverseAsteroidBeltsAsteroidBeltIdResponse>(
    `/universe/asteroid_belts/${id}`
  );
}
export async function getCategories() {
  return await get<GetUniverseCategoriesResponse>("/universe/categories");
}

export async function getCategory(id: number) {
  return await get<GetUniverseCategoriesCategoryIdResponse>(
    `/universe/categories/${id}`
  );
}

export async function getConstellations() {
  return await get<GetUniverseConstellationsResponse>(
    "/universe/constellations"
  );
}

export async function getConstellation(id: number) {
  return await get<GetUniverseConstellationsConstellationIdResponse>(
    `/universe/constellations/${id}`
  );
}

export async function getFactions() {
  return await get<GetUniverseFactionsResponse>("/universe/factions");
}

export async function getGroups() {
  return await get<GetUniverseGroupsResponse>("/universe/groups");
}

export async function getGroup(id: number) {
  return await get<GetUniverseGroupsGroupIdResponse>(`/universe/groups/${id}`);
}

export async function getMoon(id: number) {
  return await get<GetUniverseMoonsMoonIdResponse>(`/universe/moons/${id}`);
}

export async function getPlanet(id: number) {
  return await get<GetUniversePlanetsPlanetIdResponse>(
    `/universe/planets/${id}`
  );
}

export async function getRegions() {
  return await get<GetUniverseRegionsResponse>("/universe/regions");
}

export async function getRegion(id: number) {
  return await get<GetUniverseRegionsRegionIdResponse>(
    `/universe/regions/${id}`
  );
}

export async function getStargate(id: number) {
  return await get<GetUniverseStargatesStargateIdResponse>(
    `/universe/stargates/${id}`
  );
}

export async function getStar(id: number) {
  return await get<GetUniverseStarsStarIdResponse>(`/universe/stars/${id}`);
}

export async function getStation(id: number) {
  return await get<GetUniverseStationsStationIdResponse>(
    `/universe/stations/${id}`
  );
}

export async function getStructures() {
  return await get<GetUniverseStructuresResponse>("/universe/structures");
}

export async function getStructure(id: number) {
  return await get<GetUniverseStructuresStructureIdResponse>(
    `/universe/structures/${id}`
  );
}

export async function getSystems() {
  return await get<GetUniverseSystemsResponse>("/universe/systems");
}

export async function getSystem(id: number) {
  return await get<GetUniverseSystemsSystemIdResponse>(
    `/universe/systems/${id}`
  );
}

export async function getTypes() {
  return await get<GetUniverseTypesResponse>("/universe/types");
}

export async function getType(id: number) {
  return await get<GetUniverseTypesTypeIdResponse>(`/universe/types/${id}`);
}
