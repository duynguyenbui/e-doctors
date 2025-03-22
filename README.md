# blank

blank

## Attributes

- **Database**: mongodb
```bash 
docker run -d --name e-doctors -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=mongo -e MONGO_INITDB_ROOT_PASSWORD=mongopw mongo
```
- **Payment**: stripe
```
.\stripe.exe listen --forward-to localhost:3000/api/stripe/webhooks
``` 

- **Storage Adapter**: localDisk
