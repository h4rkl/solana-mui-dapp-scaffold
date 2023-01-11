import { AutoConnectProvider, useAutoConnect } from "./AutoConnectProvider";
import { clusterApiUrl } from "@solana/web3.js";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { FC, ReactNode, useCallback, useMemo } from "react";
import { NetworkConfigurationProvider, useNetworkConfiguration } from "./NetworkConfigurationProvider";
import { useSnackbar } from "./SnackbarProvider";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
  // LedgerWalletAdapter,
  // SlopeWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect();
  const { enqueueSnackbar } = useSnackbar();
  const { networkConfiguration } = useNetworkConfiguration();
  const network = networkConfiguration as WalletAdapterNetwork;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
      new TorusWalletAdapter(),
      // new LedgerWalletAdapter(),
      // new SlopeWalletAdapter(),
    ],
    [network],
  );

  const onError = useCallback((error: WalletError) => {
    enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name);
    console.error(error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={autoConnect}>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export const WalletContext: FC<{ children: ReactNode }> = ({ children }) => {
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
