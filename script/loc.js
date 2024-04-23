function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
      document.getElementById('location').innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  document.getElementById('location').innerHTML = "Latitude: " + latitude + 
  "<br>Longitude: " + longitude;
}

function showError(error) {
  switch(error.code) {
      case error.PERMISSION_DENIED:
          document.getElementById('location').innerHTML = "L'utilisateur a refusé la demande de géolocalisation.";
          break;
      case error.POSITION_UNAVAILABLE:
          document.getElementById('location').innerHTML = "Les informations de localisation ne sont pas disponibles.";
          break;
      case error.TIMEOUT:
          document.getElementById('location').innerHTML = "La demande de localisation a expiré.";
          break;
      case error.UNKNOWN_ERROR:
          document.getElementById('location').innerHTML = "Une erreur inconnue est survenue.";
          break;
  }
}
