const publicVapidKey = 'BMlnD8B_EwCO-KUfzBA7tLUTZMAnqCg82_T__20YE9drOJW0p5myXkXlR9k-s9Wa2r9uxxbDpU58pLwT6qBz8sM';

// Check for service worker

//send the push(notification)

const send = async ()=>{
    //Register service worker
    console.log('Registering Service WOrker');
    const register=await navigator.serviceWorker.register('./service_worker.js',{
        scope:'/'
    });
    console.log('Service worker registered successfully');
    //Register the push api of browser
    console.log('Registering Push...')
    const subscription=await register.pushManager.subscribe({
        userVisibleOnly:true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log('Push registered');
    //Send push notification
    await fetch('/subscribe',{
        method:'POST',
        body:JSON.stringify(subscription),
        headers:{
            'content-type':'application/json'
        }
    });
    console.log('push send');
}

const  urlBase64ToUint8Array=(base64String)=> {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }




  if ("serviceWorker" in navigator) {
    send().catch(err => console.error(err));
  }