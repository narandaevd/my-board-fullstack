const serverUrl = "http://127.0.0.1:5000";

const API = {
    auth: {
        getUrl: () => `${serverUrl}/api/auth`,
        getOptions: (data) => ({
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }),
    },
    register: {        
        getUrl: () => `${serverUrl}/api/register`,
        getOptions: (data) => ({
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }),
    },
    user: {
        getUserDataById: (id) => `${serverUrl}/api/user/${id}/data`,
    },
    card: {
        getPushUrl: (id, dashboardId, listId, cardId) => `${serverUrl}/api/user/${id}/dashboards/${dashboardId}/lists/${listId}/cards/${cardId}/add`,
        getPushOptions: (data) => ({
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }),
        getDeleteUrl: (id, dashboardId, listId, cardId) => `${serverUrl}/api/user/${id}/dashboards/${dashboardId}/lists/${listId}/cards/${cardId}/delete`,
        getDeleteOptions: () => ({
            method: 'POST',
            body: {},
        }),
    },
    list: {
        getDeleteUrl: (id, dashboardId, listId) => `${serverUrl}/api/user/${id}/dashboards/${dashboardId}/lists/${listId}/delete`,
        getDeleteOptions: () => ({
            method: 'POST',
            body: {},
        }),
        getPushUrl: (id, dashboardId, listId) => `${serverUrl}/api/user/${id}/dashboards/${dashboardId}/lists/${listId}/add`,
        getPushOptions: (data) => ({
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }),
    },
    dashboard: {
        getPushUrl: (id, dashboardId) => `${serverUrl}/api/user/${id}/dashboards/${dashboardId}/add`,
        getPushOptions: (data) => ({
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        }),
        getDeleteUrl: (id, dashboardId) => `${serverUrl}/api/user/${id}/dashboards/${dashboardId}/delete`,
        getDeleteOptions: () => ({
            method: 'POST',
            body: {},
        }),
    }
};

module.exports = API;