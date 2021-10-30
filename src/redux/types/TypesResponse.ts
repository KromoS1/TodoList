export type ResponseTypeGet<T = []> = {
    items:T
    error:null
    totalCount:number
}
export type ResponseTypeGeneric<T = []> = {
    data:T
    fieldsErrors:[]
    messages:string[]
    resultCode:number
}

