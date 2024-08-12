import { Region } from "./Region";
import { useRegions } from "./useRegions";

export function Regions() {
  const regionsQuery = useRegions();

  const { data: regionIds, isLoading, isError } = regionsQuery;

  if (isLoading) {
    return <div>loading regions...</div>;
  }

  if (isError || !regionIds) {
    return <div>couldn't load regions</div>;
  }

  return (
    <>
      {regionIds.map((regionId) => {
        return <Region id={regionId} key={regionId} />;
      })}
    </>
  );
}
