import Link from "next/link";
import { styled } from "@mui/material";
import { CarRental } from "@mui/icons-material";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  textDecoration: "none", // To remove underline from the link
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <span>ASM</span>
      <CarRental sx={{ fontSize: 40 }} />
    </LinkStyled>
  );
};

export default Logo;
