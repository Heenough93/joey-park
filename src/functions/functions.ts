import {Visitor, Message} from "../interfaces";


const positionErrorCallback = (error: GeolocationPositionError) => {
    if (error.code === error.PERMISSION_DENIED) {
        alert('User denied the request for Geolocation.');
    } else if (error.code === error.POSITION_UNAVAILABLE) {
        alert('Location information is unavailable.');
    } else if (error.code === error.TIMEOUT) {
        alert('The request to get user location timed out.');
    } else {
        alert('An unknown error occurred.');
    }

    console.log(error.message);
}

export const getCurrentPosition = (positionCallback: PositionCallback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionCallback, positionErrorCallback);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

export const getGeolocationInfo = async () => {
    return await fetch('https://geolocation-db.com/json/')
        .then((res) =>res.json())
        .then((data) => {
            const target: Visitor = Object.assign({
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

/** visitor */
export const findVisitorsOffset = async (offset: number, limit: number) => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'visitor/find-visitors-offset', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({data: { offset, limit }})
    })
        .then((res) => res.json());
};

export const findVisitors = async () => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'visitor/find-visitors', {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
        .then((res) => res.json())
        .then((res) => res.data as Visitor[]);
};

export const registerVisitor = async (visitor: Visitor) => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'visitor/register-visitor', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: visitor })
    })
        .then((res) => res.json());
};

export const modifyVisitor = async (visitor: Partial<Visitor>) => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'visitor/modify-visitor', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: visitor })
    })
        .then((res) => res.json());
};

export const removeVisitor = async (id: string) => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'visitor/remove-visitor', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: id })
    })
        .then((res) => res.json());
};

/** message */
export const findMessagesOffset = async (offset: number, limit: number) => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'message/find-messages-offset', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({data: { offset, limit }})
    })
        .then((res) => res.json());
};

export const findMessages = async () => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'message/find-messages', {
        method: "POST",
        headers: { "Content-Type": "application/json" }
    })
        .then((res) => res.json())
        .then((res) => res.data as Message[]);
};

export const registerMessage = async (message: Message) => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'message/register-message', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: message })
    })
        .then((res) => res.json());
};

export const modifyMessage = async (message: Partial<Message>) => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'message/modify-message', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: message })
    })
        .then((res) => res.json());
};

export const removeMessage = async (id: string) => {
    return await fetch(process.env.REACT_APP_BASE_URL + 'message/remove-message', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: id })
    })
        .then((res) => res.json());
};