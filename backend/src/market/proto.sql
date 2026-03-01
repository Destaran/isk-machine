WITH best_prices AS (
    SELECT
        type_id,
        MAX(CASE WHEN is_buy_order THEN price END) AS best_buy,
        MIN(CASE WHEN NOT is_buy_order THEN price END) AS best_sell
    FROM orders
    WHERE location_id = 60003760
    GROUP BY type_id
),
order_volumes AS (
    SELECT
        o.type_id,
        SUM(CASE WHEN is_buy_order AND o.price = b.best_buy THEN o.volume_remain ELSE 0 END) AS best_buy_volume,
        SUM(CASE WHEN NOT is_buy_order AND o.price = b.best_sell THEN o.volume_remain ELSE 0 END) AS best_sell_volume
    FROM orders o
    JOIN best_prices b ON o.type_id = b.type_id
    WHERE o.location_id = 60003760
    GROUP BY o.type_id
),
historical AS (
    SELECT
        type_id,
        AVG(volume) AS avg_volume,
        AVG(average) AS avg_price,
        AVG(volume * average) AS avg_daily_trade_value,
        STDDEV(average) / NULLIF(AVG(average), 0) AS volatility,
        COUNT(*) AS days_recorded
    FROM market_history
    WHERE date >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY type_id
),
joined AS (
    SELECT
        h.type_id,
        t.name AS item_name,
        b.best_buy,
        b.best_sell,
        v.best_buy_volume,
        v.best_sell_volume,
        h.avg_daily_trade_value,
        h.volatility,
        h.days_recorded,
        ((b.best_sell - b.best_buy) / NULLIF(b.best_buy,0)) - 0.056 AS net_margin,
        h.avg_daily_trade_value * 0.05 * (((b.best_sell - b.best_buy) / NULLIF(b.best_buy,0)) - 0.056) AS estimated_daily_profit,
        LEAST(v.best_buy_volume, v.best_sell_volume) AS tradeable_volume
    FROM historical h
    JOIN best_prices b ON b.type_id = h.type_id
    JOIN order_volumes v ON v.type_id = h.type_id
    JOIN types t ON t.id = h.type_id  -- join to get item name
    WHERE b.best_buy IS NOT NULL
      AND b.best_sell IS NOT NULL
      AND b.best_sell > b.best_buy
)
SELECT *
FROM joined
WHERE days_recorded >= 25
  AND volatility < 0.25
  AND net_margin >= 0.20
  AND estimated_daily_profit >= 20000000
  AND tradeable_volume >= 1000
ORDER BY estimated_daily_profit / (1 + volatility) DESC
LIMIT 50;