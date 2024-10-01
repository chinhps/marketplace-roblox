export const bearerToken = (token: string) => {
    return {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
}