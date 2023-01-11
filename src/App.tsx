import {FC, useState} from "react";
import {Box, Slider, styled} from "@mui/material";

import {Header} from "./components/Header";
import { Footer } from "./components/Footer";

const App: FC = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  return (
    <Root>
      <Header />
      <Box>
        <h2>How much do you like Solana?</h2>
        <Slider aria-label="toly-slide" max={1} value={value} step={0.01} onChange={handleChange} />
        <Box sx={{opacity: value}} display={"flex"} justifyContent={"center"}>
          <img src="toly.jpeg" alt="Toly" />
        </Box>
      </Box>
      <Footer />
    </Root>
  );
};

const Root = styled("div")`
  padding: 1% 2% 10vh 2%;
  width: 100%;
  min-height: 95vh;
  display: flex;
  justify-content: center;
  align-items: center;

  & a {
    text-decoration: none;
    color: ${({theme: {palette}}) => palette.primary.main};
  }
`;

export default App;
