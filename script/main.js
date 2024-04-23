async function getEnv() {
  const url = 'data/env.json';

  try {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    try {
      // Serve data from fallback.json
      const response = await fetch('fallback.json');
      const fallbackResult = await response.json(); // Assurez-vous que fallback.json est bien un JSON valide

      return fallbackResult;
    } catch (fallbackError) {
      console.error(fallbackError);
    }
  }
}

async function getData() {
  const url = 'https://jsonplaceholder.typicode.com/albums';

  try {
    const response = await fetch(url);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);

    try {
      // Serve data from fallback.json
      const response = await fetch('fallback.json');
      const fallbackResult = await response.json(); // Assurez-vous que fallback.json est bien un JSON valide

      return fallbackResult;
    } catch (fallbackError) {
      console.error(fallbackError);
    }
  }
}

async function callAPI(token) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };

  const res = await fetch(
    'https://api.themoviedb.org/3/movie/changes?page=1',
    options,
  ).catch((err) => console.error(err));

  const data = await res.json();

  return data;
}

// Utilisez une fonction asynchrone pour orchestrer le chargement
async function loadApp() {
  const env = await getEnv();

  const data = await getData();

  // Enregistrement du Service Worker
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        'script/sw.js',
      );
      console.log('Service Worker enregistré avec succès:', registration);
    } catch (error) {
      console.error('Échec de l’enregistrement du Service Worker:', error);
    }
  }

  const movies = await callAPI(env.API_READ_ACCESS_TOKEN);

  movies?.results?.forEach((movie) => {
    document.querySelector('#movies').innerHTML += `
    <div>
      <p>Id: ${movie.id}</p>
      <p>Adult: ${movie.adult}</p>
    </div>`;
  });
}

async function cacheResources() {
  const cache = await caches.open('my-site-cache-v1');
  const dataUrl = 'https://api.themoviedb.org/3/movie/changes?page=1';
  const response = await fetch(dataUrl);
  if (response.ok) {
      await cache.put(dataUrl, response);
  }
}

async function getCachedResources() {
  const cache = await caches.open('my-site-cache-v1');
  const match = await cache.match('https://api.themoviedb.org/3/movie/changes?page=1');
  if (match) {
      return match.json();
  }
  return null;
}

function subscribeUser() {
  navigator.serviceWorker.ready.then(function(registration) {
    const applicationServerKey = urlBase64ToUint8Array('BAdz80Ch4xiTPzLgwyjNV0O5FcWuToRAkcHJyubeZQo_n1v2v4vGRhc4aPNqm9o6sBYs2DupuS_zvAwAzZ80mco');
    registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      console.log('User is subscribed:', subscription);
    })
    .catch(function(err) {
      console.error('Failed to subscribe the user: ', err);
    });
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}



loadApp();
cacheResources();
getCachedResources();