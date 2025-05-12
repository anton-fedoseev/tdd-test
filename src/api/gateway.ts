const API_BASE = `${import.meta.env.VITE_API_BASE}/${import.meta.env.VITE_OWNER_ID}`;

export class ApiGateway {
    async get<Response>(path: string): Promise<Response> {
        const response = await fetch(`${API_BASE}${path}`);

        const dto: Response = await response.json();

        return dto;
    };

    async post<Payload, Response>(path: string, payload: Payload): Promise<Response> {
        console.log('payload', payload);

        const response = await fetch(`${API_BASE}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const dto: Response = await response.json();

        return dto;
    };

    async put<Payload, Response>(path: string, payload: Payload): Promise<Response> {
        const response = await fetch(`${API_BASE}${path}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const dto: Response = await response.json();

        return dto;
    };
}
