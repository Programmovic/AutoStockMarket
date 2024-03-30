import Link from "next/link";
import { styled } from "@mui/material/styles";
import { CarRental } from "@mui/icons-material";
import Typography from "@mui/material/Typography"; // Import Typography

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none", 
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <CarRental sx={{ fontSize: 40, color: "#5D87FF" }} />
      <Typography
        variant="h6"
        component="span"
        sx={{ marginLeft: 1, fontSize: 40, color: "#5D87FF" }}
      >
        ASM
      </Typography>{" "}
      {/* Use Typography here */}
    </LinkStyled>
  );
};

export default Logo;
