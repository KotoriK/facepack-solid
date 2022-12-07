export async function importJSON(url:string){
    return fetch(url,{method:"GET"}).then((response)=>{
        if(response.ok){
            return response.json()
        }else{
            throw new Error(`Fetch Error:Return HTTP ${response.status}, ${response.statusText}`)
        }
    })
}
