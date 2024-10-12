"use client";
import { ReactNode } from "react";
import { PrivyProvider } from "@privy-io/react-auth";

type Props = { children: ReactNode };

function Providers({ children }: Props) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "",
          walletList: ["coinbase_wallet"],
        },

        loginMethods: ["email", "wallet", "google", "apple"],

        // Create embedded wallets for users who don't have a wallet
        // embeddedWallets: {
        //   createOnLogin: "users-without-wallets",
        // },
        externalWallets: {
          coinbaseWallet: {
            //Connection options should integrate coinbase smart wallet only
            connectionOptions: "smartWalletOnly",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

export default Providers;
