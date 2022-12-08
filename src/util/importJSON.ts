export const importJSON =
    (url: string) => fetch(url)
        .then(
            (response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(`Fetch Error:Return HTTP ${response.status}, ${response.statusText}`)
                }
            }
        )
