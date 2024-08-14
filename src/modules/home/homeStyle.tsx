/** @format */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import emotionStyled from "@emotion/styled";
import { styled } from "@mui/system";

export const HomeStyle = {
  self: emotionStyled.div({
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#212630",
    justifyContent: "center",
    alignItems: "center",
  }),
  table: styled(Table)({
    maxWidth: "500px",
    width: "100%",
  }),
  tableBody: styled(TableBody)({}),
  tableRow: styled(TableRow)({}),
  tableCell: styled(TableCell)({
    color: "#FFFFFF",
    border: "none",
  }),
  cellName: emotionStyled.span({
    fontSize: "18px",
  }),
  priceContainer: emotionStyled.div({
    display: "flex",
    flexDirection: "column",
  }),
  priceContainerTitle: emotionStyled.span({
    fontSize: "18px",
  }),
  priceContainerPercent: emotionStyled.span({}),
};
