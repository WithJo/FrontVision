import { baseURL } from "./api";

export async function getSong() {
    const url = new URL(`${baseURL}/albums`);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error("Failed to get recipe data");
    const responseData = await response.json();
    return responseData;
}
