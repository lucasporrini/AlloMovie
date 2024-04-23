// Main JavaScript file or specific script file
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/script/sw.js').then(function(swReg) {
      console.log('Service Worker is registered', swReg);
  
      swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BAdz80Ch4xiTPzLgwyjNV0O5FcWuToRAkcHJyubeZQo_n1v2v4vGRhc4aPNqm9o6sBYs2DupuS_zvAwAzZ80mco')
      })
      .then(function(subscription) {
        console.log('User is subscribed:', subscription);
      })
      .catch(function(error) {
        console.error('Failed to subscribe the user: ', error);
      });
    });
  }
  
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
  