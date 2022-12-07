export default {
  async fetch(request, env) {
    return await handleRequest(request,env)
  }
}

async function handleRequest(request, env) {
  const url = new URL(request.url);
  const upc = url.searchParams.get('upc')
  const options = {
    method: 'GET',
    headers: {'X-RapidAPI-Key': env.RapidAPI_Key, 'X-RapidAPI-Host': env.RapidAPI_Host}
  };

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'json'
  };
  
  const openCache  = caches.open('product:cache');
  const checkCache = openCache.then(cache => cache.match(request));

  const apiUrl = `https://nutritionix-api.p.rapidapi.com/v1_1/item?upc=${upc}`;

  return checkCache.then(wasCached => {
      if(!wasCached)
      {
        const networkReq = fetch(apiUrl, options);

        Promise.all([networkReq, openCache]).then(([response, cache]) => {
            cache.put(request, response);
        });

        return networkReq.then(response => response.text())
        .then(json => new Response(json, {headers}))
        .catch(err => console.error(err));
      }
      else
      {
        return fetch(apiUrl, options)
      }
  })
}