const serverUrl = "http://127.0.0.1:5000";

const API = {
    getAuthUrl: () => `${serverUrl}/api/auth`,
    getAuthOptions: (data) => ({
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }),
    getUserdataById: (id) => `${serverUrl}/api/user/${id}/data`,
    getRegisterUrl: () => `${serverUrl}/api/register`,
    getPushUrl: (id, dashboardId, listId, cardId) => `${serverUrl}/api/user/${id}/dashboards/${dashboardId}/lists/${listId}/cards/${cardId}`,
    getPushOptions: (data) => ({
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
};

module.exports = API;