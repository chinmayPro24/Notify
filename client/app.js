const publicVapidKey = "BGPSqgNsCesMrhDnipxU3xrbegczSXLXrvwU7bHIgwt74a8aWjZmuqvX3kRJ8ovTU9iZtCC0FJC_Nruo-Jz_Ers";

if('serviceWorker' in navigator) {
    send().catch(err => console.log(err));
}

async function send() {
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    });
    console.log("Registered....");

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUnit8Array(publicVapidKey)
    });
    console.log('Push Registered....');


    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });

    console.log('Push Sent...');
}

const urlBase64ToUnit8Array = (base64String) => {
    const padding = '='.repeat((4-base64String.length % 4)%4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g,'/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
        
    }
    return outputArray;
}