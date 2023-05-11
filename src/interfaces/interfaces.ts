export interface ILoginInfo {
    id?: string,
    date?: string,
    appName: string,
    platform: string,
    userAgent: string,
    IPv4: string,
    city: string,
    country_code: string,
    country_name: string,
    latitude: number,
    longitude: number,
    postal: string,
    state: string,
}

export interface ISubmitInfo {
    id?: number,
    date?: string,
    name: string,
    email: string,
    subject: string,
    message: string,
}