export function updateState(payload) {
	return {
		type    : "updateState",
		key     : payload.key,
		payload : payload.value
	};
}