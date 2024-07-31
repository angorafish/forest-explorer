const requestInterceptor = jest.fn();
const responseInterceptor = jest.fn();

const axios = {
    create: jest.fn(() => ({
        interceptors: {
            request: {
                use: requestInterceptor,
            },
            response: {
                use: responseInterceptor,
            },
        },
        get: jest.fn(() => Promise.resolve({ data: {} })),
        post: jest.fn(() => Promise.resolve({ data: {} })),
        put: jest.fn(() => Promise.resolve({ data: {} })),
        delete: jest.fn(() => Promise.resolve({ data: {} })),
    })),
};

export default axios;