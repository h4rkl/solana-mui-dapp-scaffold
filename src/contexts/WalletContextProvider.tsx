import {AutoConnectProvider, useAutoConnect} from "./AutoConnectProvider";
import {clusterApiUrl} from "@solana/web3.js";
import {ConnectionProvider, WalletProvider} from "@solana/wallet-adapter-react";
import {FC, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {NetworkConfigurationProvider, useNetworkConfiguration} from "./NetworkConfigurationProvider";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
  // LedgerWalletAdapter,
  // SlopeWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {Snackbar} from "@mui/material";
import {WalletAdapterNetwork, WalletError} from "@solana/wallet-adapter-base";
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";

const WalletContextProvider: FC<{children: ReactNode}> = ({children}) => {
  const {autoConnect} = useAutoConnect();
  const {networkConfiguration} = useNetworkConfiguration();
  const network = networkConfiguration as WalletAdapterNetwork;
  const [snackMessage, setSnackMessage] = useState<string | null>(null);
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  useEffect(() => {
    setSnackMessage("Hooray");
  }, []);

  console.log(network);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter({network}),
      new SolletExtensionWalletAdapter({network}),
      new TorusWalletAdapter(),
      // new LedgerWalletAdapter(),
      // new SlopeWalletAdapter(),
    ],
    [network],
  );

  const handleClose = () => {
    setSnackMessage(null);
  };

  const onError = useCallback((error: WalletError) => {
    setSnackMessage(error.message ? `${error.name}: ${error.message}` : error.name);
    console.error(error);
  }, []);

  return (
    // TODO: updates needed for updating and referencing endpoint: wallet adapter rework
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
        <WalletModalProvider>{children}</WalletModalProvider>
        <Snackbar open={!!snackMessage} autoHideDuration={6000} onClose={handleClose} message={snackMessage} />
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const WalletContext: FC<{children: ReactNode}> = ({children}) => {
  return (
    <>
      <NetworkConfigurationProvider>
        <AutoConnectProvider>
          <WalletContextProvider>{children}</WalletContextProvider>
        </AutoConnectProvider>
      </NetworkConfigurationProvider>
    </>
  );
};
