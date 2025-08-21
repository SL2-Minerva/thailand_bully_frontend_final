export type ContentList = {
    content_id : string
    content_text : any
    created_at : string | Date
    date : string
    id :  number
    organization_id : number
    picture : string
    status : any
    title : string
    updated_at : string
}

export type ContentInput = {
    title: string
    content_text : string
    date: any
    content_id : string
    status: any
    id?: any
}