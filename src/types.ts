import WebRequestBody = chrome.webRequest.WebRequestBody;

export interface RequestData {
    id: string;
    url: string;
    method: string;
    type: string;
    timestamp: number;
    requestBody: WebRequestBody | null;
    response?: {
        status: number;
        statusText: string;
    };
}
