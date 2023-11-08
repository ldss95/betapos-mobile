import { SessionProps } from "./auth";

export interface SessionStoreProps {
	session: SessionProps | null;
	setSession: (user: SessionProps | null) => Promise<void>;
};
