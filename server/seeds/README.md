# use mongoimport insert data

## command

> mongoimport --db ${db_name} --collection ${collection_name} \
> --authenticationDatabase ${db_name} --username ${user_name} --password ${password} \
> --drop --file ${file_name} --jsonArray

### example

> mongoimport --db serai_poc_local --collection inventory \
> --authenticationDatabase serai_poc_local --username serai_poc_local --password password \
> --drop --file ./seeds/inventory.crud.json --jsonArray

## document

[mongoimport](https://docs.mongodb.com/guides/server/import/)
