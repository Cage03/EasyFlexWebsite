﻿export type FetchTarget = "main-api";

const baseFetch = (method: string, url: string, target: FetchTarget, opts?: RequestInit) => {
    const config = useRuntimeConfig();
    const urls = {
        "main-api": config.public.apiUrl,
    };
    return $fetch.raw(url, {
        baseURL: urls[target],
        // @ts-ignore
        method,
        // headers: {
        //   "Access-Control-Allow-Origin": urls[target]
        // },
        ...opts
    });
};

export const fetchFromClient = {
    get: (url: string, target: FetchTarget, opts?: RequestInit) => {
        return baseFetch("GET", url, target, opts);
    },
    post: (url: string, target: FetchTarget, opts?: RequestInit) => {
        return baseFetch("POST", url, target, opts);
    },
    patch: (url: string, target: FetchTarget, opts?: RequestInit) => {
        return baseFetch("PATCH", url, target, opts);
    },
    put: (url: string, target: FetchTarget, opts?: RequestInit) => {
        return baseFetch("PUT", url, target, opts);
    },
    delete: (url: string, target: FetchTarget, opts?: RequestInit) => {
        return baseFetch("DELETE", url, target, opts);
    },
};