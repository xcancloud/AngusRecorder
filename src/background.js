let isRecording = false;
let requests = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startRecording') {
        isRecording = true;
        requests = [];
        sendResponse({status: 'started'});
    } else if (request.action === 'stopRecording') {
        isRecording = false;
        sendResponse({status: 'stopped', requests});
    } else if (request.action === 'getRequests') {
        sendResponse({requests});
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
        if (isRecording) {
            requests.push({
                id: details.requestId,
                url: details.url,
                method: details.method,
                type: details.type,
                timestamp: details.timeStamp,
                requestBody: details.requestBody,
            });
        }
    },
    {urls: ['<all_urls>']},
    ['requestBody']
);

chrome.webRequest.onCompleted.addListener(
    (details) => {
        if (isRecording) {
            const request = requests.find((r) => r.id === details.requestId);
            if (request) {
                request.status = details.statusCode;
                request.responseHeaders = details.responseHeaders;
            }
        }
    },
    {urls: ['<all_urls>']},
    ['responseHeaders']
);
