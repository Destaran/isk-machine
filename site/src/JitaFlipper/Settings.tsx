import styled from "styled-components";
import { Container, SectionTitle } from "../components/pageElements";
import { useCallback, useEffect, useState } from "react";
import {
  getOpportunities,
  type OpportunitiesParams,
} from "../api/market/useGetOpportunities";
import { useDispatch } from "react-redux";
import {
  persistOpportunities,
  setOpportunities,
} from "../redux/orders/opportunitiesSlice";
import { useOpportunityFilters } from "../hooks/useOpportunityFilters";
import {
  getLocationById,
  useSearchLocations,
} from "../api/market/useSearchLocations";
import type { LocationSearchResult } from "../api/market/LocationSearchResult";

const SettingsContainer = styled(Container)`
  align-self: flex-start;
  overflow: visible;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Intro = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.emWhite};
  line-height: 1.5;
`;

const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const FieldCard = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.emDarkGrey};
  border: 1px solid ${({ theme }) => theme.colors.emBlack};
`;

const FieldLabel = styled.span`
  font-family: Orbitron;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.white};
`;

const FieldHint = styled.span`
  min-height: 2.4em;
  font-size: 0.85rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.emLightGrey};
`;

const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.emGrey};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.emBlack};
  color: ${({ theme }) => theme.colors.white};
  padding: 10px 12px;
  font-size: 0.95rem;

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.orange};
    outline-offset: 1px;
  }
`;

const LocationInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const LocationTextInput = styled(StyledInput)`
  width: 100%;
  box-sizing: border-box;
`;

const SelectedLocationMeta = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.emLightGrey};
`;

const Suggestions = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 10;
  border: 1px solid ${({ theme }) => theme.colors.emGrey};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.emBlack};
  max-height: 220px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
`;

const SuggestionState = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.colors.emLightGrey};
  font-size: 0.85rem;
`;

const Suggestion = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  padding: 8px 10px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.emDarkGrey};
  }
`;

const SuggestionKind = styled.span`
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.emLightGrey};
  font-size: 0.8rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FetchButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 12px 18px;
  background: ${({ theme }) => theme.colors.orange};
  color: ${({ theme }) => theme.colors.black};
  font-family: Orbitron;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(1px);
  }
`;

type LocationFilterKey = "buyLocation" | "sellLocation";

const locationFieldConfigs: Array<{
  key: LocationFilterKey;
  label: string;
  hint: string;
}> = [
  {
    key: "buyLocation",
    label: "Buy location",
    hint: "Type station or structure name and pick a match to set its ID.",
  },
  {
    key: "sellLocation",
    label: "Sell location",
    hint: "Type station or structure name and pick a match to set its ID.",
  },
];

const numericFieldConfigs: Array<{
  key: Exclude<keyof OpportunitiesParams, LocationFilterKey>;
  label: string;
  hint: string;
  step?: string;
}> = [
  {
    key: "brokerFee",
    label: "Broker fee",
    hint: "Broker fee in percent. Example: 1.38 means 1.38%.",
    step: "0.01",
  },
  {
    key: "salesTax",
    label: "Sales tax",
    hint: "Sales tax in percent. Example: 1.38 means 1.38%.",
    step: "0.01",
  },
  {
    key: "margin",
    label: "Min margin",
    hint: "Minimum net margin after fees, expressed as a decimal.",
    step: "0.01",
  },
  {
    key: "maxMargin",
    label: "Max margin",
    hint: "Upper margin limit used to filter out unrealistic spreads.",
    step: "0.01",
  },
  {
    key: "volatility",
    label: "Volatility",
    hint: "Maximum 30-day price volatility allowed for a market item.",
    step: "0.01",
  },
  {
    key: "dailyProfit",
    label: "Daily profit",
    hint: "Minimum estimated ISK profit per day required to include an item.",
  },
  {
    key: "minVolume",
    label: "Min volume",
    hint: "Minimum tradeable volume at the best buy and sell prices.",
  },
];

export function Settings() {
  const dispatch = useDispatch();
  const { filters, setFilters } = useOpportunityFilters();
  const [activeLocationField, setActiveLocationField] =
    useState<LocationFilterKey | null>(null);
  const [locationNames, setLocationNames] = useState<
    Record<LocationFilterKey, string>
  >({
    buyLocation: "",
    sellLocation: "",
  });
  const [debouncedLocationSearch, setDebouncedLocationSearch] = useState("");

  const isPercentField = (
    key: Exclude<keyof OpportunitiesParams, LocationFilterKey>,
  ) => key === "brokerFee" || key === "salesTax";

  const activeLocationSearchTerm = activeLocationField
    ? locationNames[activeLocationField]
    : "";

  useEffect(() => {
    const trimmedSearch = activeLocationSearchTerm.trim();

    if (!activeLocationField || trimmedSearch.length < 2) {
      setDebouncedLocationSearch("");
      return;
    }

    const timeout = setTimeout(() => {
      setDebouncedLocationSearch(trimmedSearch);
    }, 300);

    return () => clearTimeout(timeout);
  }, [activeLocationField, activeLocationSearchTerm]);

  const {
    data: locationResults = [],
    isFetching: isLoadingLocationResults,
    isError: isLocationSearchError,
  } = useSearchLocations(
    debouncedLocationSearch,
    debouncedLocationSearch.length > 1,
  );

  useEffect(() => {
    let isCancelled = false;

    async function hydrateLocationNames() {
      const buy = await getLocationById(filters.buyLocation);
      const sell = await getLocationById(filters.sellLocation);

      if (isCancelled) {
        return;
      }

      setLocationNames({
        buyLocation: buy?.name ?? String(filters.buyLocation),
        sellLocation: sell?.name ?? String(filters.sellLocation),
      });
    }

    hydrateLocationNames();

    return () => {
      isCancelled = true;
    };
    // Keep labels in sync with selected IDs.
  }, [filters.buyLocation, filters.sellLocation]);

  const handleFilterChange =
    (key: Exclude<keyof OpportunitiesParams, LocationFilterKey>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.valueAsNumber;
      const normalizedValue = Number.isFinite(inputValue)
        ? isPercentField(key)
          ? inputValue / 100
          : inputValue
        : inputValue;

      setFilters((current) => ({
        ...current,
        [key]: normalizedValue,
      }));
    };

  const getNumericInputValue = (
    key: Exclude<keyof OpportunitiesParams, LocationFilterKey>,
  ): number | "" => {
    const value = filters[key];

    if (!Number.isFinite(value)) {
      return "";
    }

    if (!isPercentField(key)) {
      return value;
    }

    // Keep UI input stable and human-friendly by trimming floating-point noise.
    return Number((value * 100).toFixed(4));
  };

  const handleLocationChange =
    (key: LocationFilterKey) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setLocationNames((current) => ({
        ...current,
        [key]: value,
      }));
      setActiveLocationField(key);
    };

  const handleLocationSelect = (
    key: LocationFilterKey,
    location: LocationSearchResult,
  ) => {
    setFilters((current) => ({
      ...current,
      [key]: location.id,
    }));
    setLocationNames((current) => ({
      ...current,
      [key]: location.name,
    }));
    setActiveLocationField(null);
  };

  const handleGetOpportunities = useCallback(async () => {
    const opportunities = await getOpportunities(filters);
    const payload = {
      opportunities,
      params: { ...filters },
      fetchedAt: new Date().toISOString(),
    };

    persistOpportunities(payload);
    dispatch(setOpportunities(payload));
  }, [dispatch, filters]);

  return (
    <SettingsContainer>
      <SectionTitle>Settings</SectionTitle>
      <Wrapper>
        <Intro>
          Tune the market filters below before fetching Jita flipper
          opportunities. Select buy/sell locations by name and the backend will
          receive their IDs. Broker fee and sales tax inputs are percentages
          (for example 1.38 means 1.38%). Broker fee is applied on both sides,
          while sales tax applies only to the sell side when calculating net
          margin.
        </Intro>
        <FieldsGrid>
          {locationFieldConfigs.map((field) => (
            <FieldCard key={field.key}>
              <FieldLabel>{field.label}</FieldLabel>
              <FieldHint>{field.hint}</FieldHint>
              <LocationInputContainer>
                <LocationTextInput
                  type="text"
                  placeholder="Start typing location name..."
                  value={locationNames[field.key]}
                  onChange={handleLocationChange(field.key)}
                  onFocus={() => setActiveLocationField(field.key)}
                  onBlur={() => {
                    setTimeout(() => {
                      setActiveLocationField((current) =>
                        current === field.key ? null : current,
                      );
                    }, 120);
                  }}
                />
                {activeLocationField === field.key &&
                  debouncedLocationSearch.length > 1 && (
                    <Suggestions>
                      {isLoadingLocationResults && (
                        <SuggestionState>
                          Searching locations...
                        </SuggestionState>
                      )}
                      {!isLoadingLocationResults && isLocationSearchError && (
                        <SuggestionState>
                          Could not load locations. Check backend and try again.
                        </SuggestionState>
                      )}
                      {!isLoadingLocationResults &&
                        !isLocationSearchError &&
                        locationResults.length === 0 && (
                          <SuggestionState>
                            No matching locations found.
                          </SuggestionState>
                        )}
                      {!isLoadingLocationResults &&
                        !isLocationSearchError &&
                        locationResults.map((result) => (
                          <Suggestion
                            key={result.id}
                            type="button"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() =>
                              handleLocationSelect(field.key, result)
                            }
                          >
                            {result.name}
                            <SuggestionKind>
                              {result.kind} · #{result.id}
                            </SuggestionKind>
                          </Suggestion>
                        ))}
                    </Suggestions>
                  )}
              </LocationInputContainer>
              <SelectedLocationMeta>
                Selected ID: {filters[field.key]}
              </SelectedLocationMeta>
            </FieldCard>
          ))}
          {numericFieldConfigs.map((field) => (
            <FieldCard key={field.key}>
              <FieldLabel>{field.label}</FieldLabel>
              <FieldHint>{field.hint}</FieldHint>
              <StyledInput
                type="number"
                step={field.step}
                value={getNumericInputValue(field.key)}
                onChange={handleFilterChange(field.key)}
              />
            </FieldCard>
          ))}
        </FieldsGrid>
      </Wrapper>
      <Actions>
        <FetchButton onClick={handleGetOpportunities}>
          Get opportunities
        </FetchButton>
      </Actions>
    </SettingsContainer>
  );
}
