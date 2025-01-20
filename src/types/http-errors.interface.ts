interface Problem {
    title:string, 
    statusCode:number, 
    detail?:string,
    errors?:Record<string, string[]>
}

