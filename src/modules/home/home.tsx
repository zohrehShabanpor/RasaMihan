/** @format */

import { memo, useState } from "react";

import { useSocket } from "../../services/socket/socket";
import { css } from "@emotion/css";
import { HomeStyle } from "./homeStyle";

export const HomeModule = memo(() => {
  const [data, setData] = useState<
    {
      symbol: string;
      priceChangePercent: string;
      lastPrice: string;
    }[]
  >();

  const { emitMessage } = useSocket({
    onOpenedMount: () => {
      emitMessage({
        method: "SUBSCRIBE",
        params: ["!ticker@arr"],
        id: 1,
      });
    },
    onUnMount: () => {
      emitMessage({
        method: "UNSUBSCRIBE",
        params: ["!ticker@arr"],
        id: 1,
      });
    },
  });

  useSocket({
    onMessage: (message) => {
      if (!message || !Array.isArray(message)) return;

      if (!data)
        setData(
          message.map((item) => ({
            lastPrice: item.c,
            priceChangePercent: item.p,
            symbol: item.s,
          }))
        );
      else
        setData(
          data.map((item) => {
            const found = message.find((e) => e.s === item.symbol);
            if (!found) return item;

            return {
              ...item,
              lastPrice: found.c,
              priceChangePercent: found.p,
            };
          })
        );
    },
  });

  return (
    <HomeStyle.self className="testtt">
      <HomeStyle.table>
        <HomeStyle.tableBody>
          {data?.map((row) => (
            <HomeStyle.tableRow
              key={row.symbol}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <HomeStyle.tableCell component="th" scope="row">
                <HomeStyle.cellName>{row.symbol}</HomeStyle.cellName>
              </HomeStyle.tableCell>
              <HomeStyle.tableCell align="right">
                <HomeStyle.priceContainer>
                  <HomeStyle.priceContainerTitle>
                    {row.lastPrice}
                  </HomeStyle.priceContainerTitle>
                  <HomeStyle.priceContainerPercent
                    className={css`
                      color: ${row.priceChangePercent.includes("-")
                        ? "#f5455c"
                        : "#2cbc83"};
                    `}
                  >
                    {`${row.priceChangePercent.includes("-") ? "" : "+"}${
                      row.priceChangePercent
                    }%`}
                  </HomeStyle.priceContainerPercent>
                </HomeStyle.priceContainer>
              </HomeStyle.tableCell>
            </HomeStyle.tableRow>
          ))}
        </HomeStyle.tableBody>
      </HomeStyle.table>
    </HomeStyle.self>
  );
});
