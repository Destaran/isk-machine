import { useCallback, useLayoutEffect, useRef, useState } from "react";

interface UseSyncedOrderTableColumnsInput {
  dependencies: unknown[];
}

interface UseSyncedOrderTableColumnsResult {
  buyTableRef: React.MutableRefObject<HTMLDivElement | null>;
  sellTableRef: React.MutableRefObject<HTMLDivElement | null>;
  columnsTemplate: string | undefined;
}

export function useSyncedOrderTableColumns({
  dependencies,
}: UseSyncedOrderTableColumnsInput): UseSyncedOrderTableColumnsResult {
  const sellTableRef = useRef<HTMLDivElement | null>(null);
  const buyTableRef = useRef<HTMLDivElement | null>(null);
  const [columnsTemplate, setColumnsTemplate] = useState<string>();

  const syncColumnWidths = useCallback(() => {
    const tables = [sellTableRef.current, buyTableRef.current].filter(
      (table): table is HTMLDivElement => !!table,
    );

    if (!tables.length) {
      return;
    }

    const nextColumnWidths = Array.from({ length: 7 }, () => 0);
    let hasMeasuredCells = false;

    tables.forEach((table) => {
      const rows = Array.from(table.children);

      rows.forEach((row) => {
        if (!(row instanceof HTMLDivElement) || row.children.length !== 7) {
          return;
        }

        Array.from(row.children).forEach((child, index) => {
          const cell = child as HTMLElement;
          const renderedWidth = Math.ceil(cell.getBoundingClientRect().width);
          const intrinsicWidth = Math.ceil(cell.scrollWidth + 2);
          const width = Math.max(renderedWidth, intrinsicWidth);

          if (width > 0) {
            hasMeasuredCells = true;
          }

          nextColumnWidths[index] = Math.max(nextColumnWidths[index], width);
        });
      });
    });

    if (!hasMeasuredCells) {
      return;
    }

    const nextTemplate = nextColumnWidths
      .map((width) => `${Math.max(width, 1)}px`)
      .join(" ");

    setColumnsTemplate((currentTemplate) =>
      currentTemplate === nextTemplate ? currentTemplate : nextTemplate,
    );
  }, []);

  useLayoutEffect(() => {
    syncColumnWidths();

    const rafOne = window.requestAnimationFrame(syncColumnWidths);
    const rafTwo = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(syncColumnWidths);
    });

    const onResize = () => {
      syncColumnWidths();
    };

    window.addEventListener("resize", onResize);

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => syncColumnWidths())
        : null;

    if (observer) {
      if (sellTableRef.current) {
        observer.observe(sellTableRef.current);
      }
      if (buyTableRef.current) {
        observer.observe(buyTableRef.current);
      }
    }

    return () => {
      window.cancelAnimationFrame(rafOne);
      window.cancelAnimationFrame(rafTwo);
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
    };
  }, [syncColumnWidths, ...dependencies]);

  return {
    buyTableRef,
    sellTableRef,
    columnsTemplate,
  };
}
