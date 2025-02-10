"use client";

import { DynamicWidget } from "@/lib/dynamic";
import DynamicMethods from "@/app/components/Methods";
import "./page.css";

import {
  useAuthenticateConnectedUser,
  useDynamicContext,
  useSocialAccounts,
} from "@dynamic-labs/sdk-react-core";
import { ProviderEnum } from "@dynamic-labs/types";

export default function Main() {
  const { user } = useDynamicContext();

  const {
    linkSocialAccount,
    unlinkSocialAccount,
    isLinked,
    getLinkedAccountInformation,
  } = useSocialAccounts();

  const provider = ProviderEnum.Twitter;
  const isXLinked = isLinked(provider);
  const { authenticateUser } = useAuthenticateConnectedUser();
  const connectedAccountInfo = getLinkedAccountInformation(provider);

  console.log({ isXLinked, connectedAccountInfo, user });

  const handleSignAndConnect = async () => {
    if (!user) {
      await authenticateUser();
    }
    linkSocialAccount(provider);
  };

  return (
    <div className="container dark">
      <div className="modal">
        <DynamicWidget />
        <DynamicMethods isDarkMode={true} />
      </div>

      <div>
        <div className="label">
          <p>{connectedAccountInfo?.publicIdentifier ?? provider}</p>
        </div>
        {isXLinked ? (
          <button type="button" onClick={() => unlinkSocialAccount(provider)}>
            Disconnect
          </button>
        ) : (
          <button onClick={handleSignAndConnect} type="button">
            Connect X
          </button>
        )}
        <button
          onClick={() => authenticateUser()}
          type="button"
          style={{ marginLeft: "24px" }}
        >
          Authenticate
        </button>
      </div>
    </div>
  );
}
