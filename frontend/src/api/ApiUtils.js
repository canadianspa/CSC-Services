export function handleResponse(response) {
	if (response.ok) {
		return response.json();
	} else {
		throw new Error("Bad response.");
	}
}
