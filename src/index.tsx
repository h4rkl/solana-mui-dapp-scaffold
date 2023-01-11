// import reportWebVitals from './reportWebVitals';
import App from "./App";
import ReactDOM from "react-dom/client";
import { ChosenThemeProvider, ThemeProvider } from "./contexts";
import { StrictMode } from "react";
import { WalletContext } from "./contexts";
import { SnackbarProvider } from "./contexts/SnackbarProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>
    <SnackbarProvider>
      <ChosenThemeProvider>
        <ThemeProvider>
          <WalletContext>
            <App />
          </WalletContext>
        </ThemeProvider>
      </ChosenThemeProvider>
    </SnackbarProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
