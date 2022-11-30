# D & B loader

Download csv from google sheet and rename it to `dnb_group.csv`

Move the csv to `./utils/d-and-b-data-loader-scripts`

> $ yarn add csvtojson

write `"csvtojson": "csvtojson"` to package.json scripts

> $ yarn csvtojson dnb_group.csv > dnb_group.json

> $ node source-d-and-b-data.js

the script can help to generate d&b data seed

> $ yarn migrate:local reset
 
> $ yarn migrate:local up
