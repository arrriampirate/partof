const get = (url) => {
    return fetch(url).then(response => {
        return response.json();
    });
};

async function post(url, params, isJson = true) {
    const headers = {
        'Accept': 'application/json',
    };

    if (isJson) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: isJson ? JSON.stringify(params) : params
    });
    return await response.json();
}

const api = {
    get: {
        posts: () => get('/api/get/posts/'),
        post: (id) => get(`/api/get/posts/${id}/`),

        users: () => get('/api/get/users/'),
        user: (id) => get(`/api/get/users/${id}/`)
    },
    post: {
        togglePost: (id) => post(`/api/post/toggle/post/${id}/`),
        updateUser: (params) => post('/api/post/update/user/', params, false),
        checkPostSlug: (params) => post('/api/post/check/slug/', params),
        updatePost: (params) => post('/api/post/update/post/', params, false),
    }
};

export default api;