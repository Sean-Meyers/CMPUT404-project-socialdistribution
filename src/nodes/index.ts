import API from "./api";
import APIClient from "./api-client";
import Manager from "./node-manager";
import Client from "./node-client";
import url from "url";

import API7 from './schemas/t7/api';
import API12 from "./schemas/t12/api";
import API17 from "./schemas/t17/api";

const Team7 = new API7( process.env.NEXT_PUBLIC_T7_API_URL || 'https://sd7-api.herokuapp.com', {
    auth:{
        username: process.env.NEXT_PUBLIC_T7_UNAME || "credential env failure",
        password: process.env.NEXT_PUBLIC_T7_PW || "credential env failure"
    }
});

const Team12 = new API12( process.env.NEXT_PUBLIC_T12_API_URL || 'https://cmput404-project-data.herokuapp.com', {
    auth:{
        username: process.env.NEXT_PUBLIC_T12_UNAME || "credential env failure",
        password: process.env.NEXT_PUBLIC_T12_PW || "credential env failure"
    }
});

const Team17 = new API17(process.env.NEXT_PUBLIC_T17_API_URL || 'https://social-distribution-w23-t17.herokuapp.com', {
    auth:{
        username: process.env.NEXT_PUBLIC_T17_UNAME || "credential env failure",
        password: process.env.NEXT_PUBLIC_T17_PW || "credential env failure"
    },
    
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Referer': 'https://social-distribution-w23-t17.herokuapp.com', 
     }
});

const LocalNode = new API(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/service', {
    auth:{
        username: process.env.NEXT_PUBLIC_FE_UNAME || "credential env failure",
        password: process.env.NEXT_PUBLIC_FE_PW || "credential env failure"
    }
}, 'local');


const nodeManager = new Manager({});

export const getURL = (fullUrl: string) => {
    const parsedUrl = url.parse(fullUrl);
let port = parsedUrl.port;
    if (parsedUrl.port === '80' || parsedUrl.port === '443' || parsedUrl.port === null) {
        port = '';
    } 
    else { 
        port = `:${parsedUrl.port}`;
    }
const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${port}`;
    return baseUrl;
}

nodeManager.addNode(getURL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/service'), LocalNode);
nodeManager.addNode(getURL(process.env.NEXT_PUBLIC_T7_API_URL || 'https://sd7-api.herokuapp.com/api'), Team7);
nodeManager.addNode(getURL(process.env.NEXT_PUBLIC_T12_API_URL || 'https://cmput404-project-data.herokuapp.com/service'), Team12);
nodeManager.addNode(getURL(process.env.NEXT_PUBLIC_T17_API_URL || 'https://social-distribution-w23-t17.herokuapp.com'), Team17);

const NextAPI = new APIClient();

const nodeClient = new Client(NextAPI);

const globalValues = global as unknown as {
    NodeClient: Client;
    NodeManager: Manager;
}

export const NodeManager = globalValues.NodeManager || nodeManager;
export const NodeClient = globalValues.NodeClient || nodeClient;
