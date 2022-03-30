import { server_rpc } from "./server";
import { client_rpc } from "./client";

interface Node {
	instance?: Instance;
}

const stack = new Array<Node>();

function new_node(): Node {
	const node = {};
	stack.push(node);
	return node;
}

type MappedEvents<
	T extends {
		[name: string]: <U extends Array<unknown>>(
			root: Instance,
			is_client: boolean,
		) =>
			| { OnClientEvent: RBXScriptSignal<(...params: U) => void> }
			| { OnServerEvent: RBXScriptSignal<(...params: U) => void> };
	},
> = {
	[K in keyof T]: ReturnType<T[K]>;
};

function create_events<
	T extends {
		[name: string]: (root: Instance) => { OnClientEvent: RBXScriptSignal } | { OnServerEvent: RBXScriptSignal };
	},
>(events: T): MappedEvents<T> & { (): void } {
	const mapped_events = {} as { [index: string]: RemoteEvent };

	for (const [name, fn] of pairs(events as unknown as Map<string, Callback>)) {
		const node = stack[stack.size() - 1];
		mapped_events[name] = fn(node.instance) as RemoteEvent;
	}

	return setmetatable(mapped_events, {
		__call: () => {
			print("initialized");
		},
	}) as MappedEvents<T> & { (): void };
}

export function host_events(root: Instance): Node {
	const node = new_node();
	node.instance = root;
	return node;
}

export function create_apis<
	T extends {
		[name: string]: (root: Instance) => { OnClientEvent: RBXScriptSignal } | { OnServerEvent: RBXScriptSignal };
	},
>(events: T): MappedEvents<T> & { (): void } {
	return create_events(events);
}

export { server_rpc, client_rpc };
