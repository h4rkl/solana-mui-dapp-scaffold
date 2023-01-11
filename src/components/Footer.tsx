import { Paper, Container, Box, Typography, Link } from "@mui/material";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <Paper sx={{ marginTop: "calc(10% + 60px)", width: "100%", position: "fixed", bottom: 0 }} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            m: 2,
          }}
        >
          <Typography variant="caption">
            Made with ❤️ by{" "}
            <Link href="https://twitter.com/harkl_" target="_blank">
              harkl
            </Link>
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};
