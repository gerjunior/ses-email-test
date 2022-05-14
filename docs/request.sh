# curl localhost:3000/emails/send -X POST -d '{"to": ["geraldo@authenticatedemail.co"], "subject": "Welcome!", "message": "<h2>Welcome message!</h2>" }' -i --header Content-Type:\ application/json | jq

curl localhost:3000/emails/template -X POST -d '{ "name": "WelcomeTemplate", "subject": "Welcome!", "content": "<h2>Welcome, {{name}}!</h2><p>First time here?</p><p>Check our stuff!</p>{{{content}}}" }' -i --header Content-Type:\ application/json | jq

curl localhost:3000/emails/send -X POST -d '{"to": ["geraldo@authenticatedemail.co"], "name": "Geraldo", "message": "<p>AHEEEEYOOO</p>", "template": "WelcomeTemplate" }' -i --header Content-Type:\ application/json | jq
