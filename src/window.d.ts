import { IBackendConnection } from "ohg-connector/dist/connection";
import { Room } from "ohg-connector/dist";

declare global {
    interface Window {
        backendConnection: IBackendConnection;
        rooms: Room[];
    }
}