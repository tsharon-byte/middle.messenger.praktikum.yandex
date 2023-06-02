type ChatType = {
    id: string,
    avatar: string | null,
    title: string,
    last_message: string | null,
    time?: string,
    unread_count: number,
    events?: object
}
