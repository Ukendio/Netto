import { get_or_create } from "./get_or_create";

export function server_rpc<T extends Array<unknown>>(
	name = tostring(debug.info(1, "s")[0]),
): (root: Instance) => RemoteEvent & {
	OnClientEvent: RBXScriptSignal<(...parameters: T) => void>;
	FireAllClients: (this: RemoteEvent, ...args: T) => void;
	FireClient: (player: Player, ...args: T) => void;
} {
	return function (root): RemoteEvent & {
		OnClientEvent: RBXScriptSignal<(...parameters: T) => void>;
		FireAllClients: (...args: T) => void;
		FireClient: (player: Player, ...args: T) => void;
	} {
		return get_or_create("RemoteEvent", name, root);
	};
}
