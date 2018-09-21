export function groupBy<T, K extends keyof T>(items: T[], key: K) {
	return items.reduce(
		(entryMap, e) =>
			entryMap.set(e[key], [...(entryMap.get(e[key]) || []), e]),
		new Map<T[K], T[]>()
	);
}

export function aggregateSum<T>(
	items: T[],
	fieldExtractor: (item: T) => number
) {
	return items.reduce((sum, item) => {
		return sum + fieldExtractor(item);
	}, 0);
}
