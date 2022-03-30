import { get_or_create } from "./get_or_create";

export function client_rpc<T extends Array<unknown>>(
	name = tostring(debug.info(1, "s")[0]),
): (root: Instance) => RemoteEvent & {
	OnServerEvent: RBXScriptSignal<(player: Player, ...parameters: T) => void>;
	FireServer: (this: RemoteEvent, ...args: T) => void;
} {
	return function (root): RemoteEvent & {
		OnServerEvent: RBXScriptSignal<(player: Player, ...parameters: T) => void>;
		FireServer: (this: RemoteEvent, ...args: T) => void;
	} {
		return get_or_create("RemoteEvent", name, root);
	};
}
