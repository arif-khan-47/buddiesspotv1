export interface User{
    name?:string|null|undefined,
    email?:string|null|undefined,
    password?:string|null|undefined,
    role?:"user"|"admin",
    accessToken?:string|null|undefined,
}