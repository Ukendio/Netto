export function get_or_create<T extends keyof CreatableInstances>(
	class_name: T,
	name: string,
	target: Instance,
): CreatableInstances[T] {
	const maybe_found = target.FindFirstChild(name) as CreatableInstances[T];
	if (maybe_found !== undefined && maybe_found.IsA(class_name)) {
		return maybe_found;
	}

	const inst = new Instance(class_name);
	inst.Name = name;
	inst.Parent = target;

	return inst;
}
