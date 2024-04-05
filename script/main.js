async function getEnv(env) {
  const url = 'data/env.json';
  
  try {
    const response = await fetch(url);
    const result = await response.json();
    
    for (const key in result) {
      env[key] = result[key];
    }
  } catch (error) {
    console.error(error);
    try {
      // Serve data from fallback.json
      const response = await fetch('fallback.json');
      const fallbackResult = await response.json(); // Assurez-vous que fallback.json est bien un JSON valide

      for (const key in fallbackResult) {
        env[key] = fallbackResult[key];
      }
    } catch (fallbackError) {
      console.error(fallbackError);
    }
  }
}

async function getData(data) {
  const url = 'https://jsonplaceholder.typicode.com/albums';
  
  try {
    const response = await fetch(url);
    const result = await response.json();
    
    result.forEach((item) => {
      data.push(item);
    });
  } catch (error) {
    console.error(error);

    try {
      // Serve data from fallback.json
      const response = await fetch('fallback.json');
      const fallbackResult = await response.json(); // Assurez-vous que fallback.json est bien un JSON valide

      fallbackResult.forEach((item) => {
        data.push(item);
      });
    } catch (fallbackError) {
      console.error(fallbackError);
    }
  }
}

async function callAPI(token, data) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + token
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/changes?page=1', options)
    .then(response => response.json())
    .then(response => {
      response.results.forEach((item) => {
        data.push(item);
      });
    })
    .catch(err => console.error(err));
}

// Utilisez une fonction asynchrone pour orchestrer le chargement
async function loadApp() {
  const env = {};
  await getEnv(env);

  const data = [];
  await getData(data);

  // Enregistrement du Service Worker
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('script/sw.js');
      console.log('Service Worker enregistré avec succès:', registration);
    } catch (error) {
      console.error('Échec de l’enregistrement du Service Worker:', error);
    }
  }

  const movies = [];
  await callAPI(env.API_READ_ACCESS_TOKEN, movies);
  console.log(movies);

  movies.push({id: 444, adult: true})
  console.log(movies);
  movies.forEach((movie) => {
    console.log(movie);
  });
}

loadApp();