import {ILoginInfo, ISubmitInfo} from "../interfaces";

export const getGeolocationInfo = async () => {
    return await fetch('https://geolocation-db.com/json/')
        .then((res) =>res.json())
        .then((data) => {
            const target: ILoginInfo = Object.assign({
                'appName': navigator.appName,
                'platform': navigator.platform,
                'userAgent': navigator.userAgent,
            }, data);
            return target;
        });
};

export const sendMessage = async (message: string) => {
    // console.log('https://api.telegram.org/bot' + process.env.REACT_APP_TOKEN + '/sendMessage?chat_id=' + process.env.REACT_APP_CHAT_ID + '&text=' + message);
    return await fetch('https://api.telegram.org/bot' + process.env.REACT_APP_TOKEN + '/sendMessage?chat_id=' + process.env.REACT_APP_CHAT_ID + '&text=' + message);
};

export const getSubmitInfos = async () => {
    return await fetch(process.env.REACT_APP_BASE_URL + "submits")
        .then((res) => res.json())
        .then((data: ISubmitInfo[]) => data);
};

export const aaa = async () => {
    return await fetch(process.env.REACT_APP_BASE_URL + "submits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Suzan", alias: "고슴도치" })
    })
        .then((res) => res.json())
        .then((data: ISubmitInfo[]) => data);
};