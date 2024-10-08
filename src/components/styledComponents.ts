// src/components/styledComponents.ts

import { styled } from "@mui/system";

export const FormSection = styled("section")(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: "#1A202C",
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(3),
}));

export const FormHeader = styled("h2")(({ theme }) => ({
  fontSize: "1.75rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(0),
}));
