export interface ILoginInfo {
    IPv4: string,
    appName: string,
    city: string,
    country_code: string,
    country_name: string,
    latitude: number,
    longitude: number,
    platform: string,
    postal: string,
    state: string,
    userAgent: string,
}

export interface ISubmitInfo {
    id?: number,
    name: string,
    email: string,
    subject: string,
    message: string,
    date?: string,
}