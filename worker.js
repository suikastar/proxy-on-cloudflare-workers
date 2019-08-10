addEventListener('fetch', event => {
    event.respondWith(proxy(event));
});

async function proxy(event) {
    let url = new URL(event.request.url);
    let pathname = url.pathname;
    let sub_pathname_arr = pathname.split("/");
    const domain = sub_pathname_arr[1];
    sub_pathname_arr.splice(0, 2);
    pathname = '/' + sub_pathname_arr.join('/');
    url.pathname = pathname;
    url.hostname = domain;
    event.request.headers.Host = domain;
    return fetch(new Request(url, event.request));
}
