export type MappedEvents<
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

export type Id<T> = T;
export type PatchOverride<Base, Overrides> = Id<{
	[K in keyof Base | keyof Overrides]: K extends keyof Overrides
		? Overrides[K]
		: K extends keyof Base
		? Base[K]
		: "never";
}>;
