const webPush = require('web-push')

const vapidKeys = {
	publicKey: 'BBJ51slZXoZss2hxV_7pkdKAjZHFVkHjwNV3NfO1-T19OvaqeWgb8_SwSZCfjB5wNtT03IG49n4tt4jkqxCN0u0',
	privateKey: 'BBqlJsR2aK39V4eo-wwZGYFFfuZS2MsNZrgfBKo_UTw'
}

const pushSubscription = {
	endpoint: 'https://fcm.googleapis.com/fcm/send/fCtnEjgADgY:APA91bGaFTkKhfTxF4-r5-bsRFUMLMOHqIsa0hwYZwIgalJV4iF9C-OqlBLVM6bryX8mjnBNLn86ZKIsCXtbRhR6H2h52_2fQCl3HwZxWdydIeOLVg7HKKUjtwid-rIWGbDbj9doqYV3',
	keys: {
		p256dh: 'BInAbcs1VTL1hR4op8dgtu3CUs5gL/zn3q465ry6XwCZijo99AsMQIn48baZlIHIURwh6H9q8f9qQnzPjvpSA8o=',
		auth: 'nJaPw1vTcOcWZvupx8ECiA=='
	}
}

let payload = "Today, Real Madrid vs Barcelona"

let options = {
	gcmAPIKey: '741451177275',
	TTL: 60
}

webPush.setVapidDetails(
	'mailto:dickaismaji@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
)

webPush.sendNotification(pushSubscription,payload,options)