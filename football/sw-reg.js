if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
            .register("./sw-football-with-workbox.js")
            .then(res => {
                console.log("SW registered")
            })
            .catch(function() {
                console.log("SW failed");
            })
        navigator.serviceWorker.ready.then(function(){
            regPushManager()
        }).catch(()=> console.log("sw unready"))
    })
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

if ('Notification' in window) {
     Notification.requestPermission()
        .then(res => {
            if (res === 'granted') {
                navigator.serviceWorker.ready.then(reg => {
                    reg.showNotification(title, option2)
                })
            } else {
                console.log("Notification rejected");
            }
        })
} else {
    console.log("Notification didn't supported by this browser");
}

//register push service google cloud messenging
function regPushManager(){
    if ('PushManager' in window) {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BBJ51slZXoZss2hxV_7pkdKAjZHFVkHjwNV3NfO1-T19OvaqeWgb8_SwSZCfjB5wNtT03IG49n4tt4jkqxCN0u0')
            }).then(subscribe => {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch((err) => {
                console.log("Tidak dapat melakukan subscribe " + err.message);
            })
        })
    }
}

function urlBase64ToUint8Array(base64) {
    const padding = '='.repeat((4 - base64.length % 4) % 4);
    var base64 = (base64 + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

//notification greetings

const dt = new Date()

let hours = dt.getHours()
let greetings
let body

if(hours < 5){
    greetings = 'Good Night coming Morning'
    body = "Prepare your self today"
}else if(hours < 10){
    greetings = 'Good Morning'
    body = 'Its best to start activity'
}else if(hours < 15){
    greetings = 'Good Noon'
    body = "Don't forget to eat guys"
}else if(hours < 19){
    greetings = 'Good Afternooon'
    body = "Lets see the sunset"
}else if(hours < 21){
    greetings = 'Good Night'
    body = "Take a rest after fully working today"
}else if(hours < 23){
    greetings = 'Time to sleep guys'
    body = "Rest your body, reach the dream"
}else{
    greetings = 'Time to sleep guys'
    body = "Rest your body, reach the dream"
}

greetings = greetings + ', Football Fans'

const title = greetings
const option2 = {
    body,
    icon: './assets/img/icon/Icon-512.png',
    badge: './assets/img/icon/Icon-512.png',
    tag: 'greetings'
}
