export type ResponseTypeGet<T = []> = {
    items:T
    error:null
    totalCount:number
}
export type ResponseType<T = {}> = {
    data: T
    resultCode: number
    messages: string
}
export type ResponseTypeGeneric<T = []> = {
    data:T
    fieldErrors:[]
    messages:[]
    resultCode:number
}

