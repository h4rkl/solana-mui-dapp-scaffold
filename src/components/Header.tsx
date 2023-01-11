import { FC } from "react";
import { AppBar, Box, Container, Toolbar } from "@mui/material";

import DarkModeToggle from "./DarkModeToggle";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";

export const Header: FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Container maxWidth="lg" disableGutters={true}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1, alignSelf: "center" }}>
              <DarkModeToggle />
            </Box>
            <Box py={1}>
              <WalletMultiButton />
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};
