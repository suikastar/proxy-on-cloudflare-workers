addEventListener('fetch', event => {
  event.respondWith(proxy(event));
});

async function proxy(event) {
  let url = new URL(event.request.url);
  const domain = url.searchParams.get('domain');
  url.searchParams.delete('domain')
  url.hostname = domain;
  event.request.headers.Host = domain;
  return fetch(new Request(url, event.request));
}
