import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IVagasReservadasProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext
}
