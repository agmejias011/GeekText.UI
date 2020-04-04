import clone from "lodash.clonedeep";

let stored_state = localStorage.getItem("state");

try {
	stored_state = JSON.parse(stored_state);
} catch {
	stored_state = false;
}

const initial_state = stored_state || {
	authenticated : false,
	user          : null
};

function rootReducer(state, action) {
	if (!state) {
		state = initial_state;
	}

	let new_state = createNewState(state, action);

	new_state = Object.assign(
		{},
		new_state || state
	);

	localStorage.setItem("state", JSON.stringify(new_state));
	return new_state;
};

function createNewState(state, action) {
	if (!action || !action.key) {
		return false;
	}

	let new_state = clone(state);

	new_state[action.key] = action.payload;

	return new_state;
}

export default rootReducer;