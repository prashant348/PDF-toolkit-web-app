const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL

export type ApiError = {
    status: number
    message: string
}

async function api<T>(
    apiendpoint: string,
    options: RequestInit = {}
): Promise<T> {

    const url = `${FASTAPI_BASE_URL}${apiendpoint}`
    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
        },
        credentials: "include",
    }).catch((e) => {
        throw {
            status: 500,
            message: e.message,
        } as ApiError;
    });

    if (!response.ok) {
        const txt = await response.text().catch(() => "");
        throw {
            status: response.status,
            message: txt,
        } as ApiError;
    };

    const json = await response.json();
    return json as T;

};

export const apiGet = <T>(
    apiendpoint: string,
    options: RequestInit = {}
) => api<T>(apiendpoint, { ...options, method: "GET" });


export const apiPost = <T>(
    apiendpoint: string,
    body?: unknown,
    options: RequestInit = {}
) => api<T>(
    apiendpoint,
    { ...options, method: "POST", body: JSON.stringify(body ?? {}) }
);

export const apiDel = <T>(
    apiendpoint: string,
    body?: unknown, 
    options: RequestInit = {}
) => api<T>(
    apiendpoint, 
    { ...options, method: "DELETE", body: JSON.stringify(body ?? {}) }
);
