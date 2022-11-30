ciUrl="mongodb://serai_poc_ci:$1@34.92.118.222:27017/serai_poc_ci"
previewUrl="mongodb://serai_poc_preview:$2@34.92.118.222:27017/serai_poc_preview"
productionUrl="mongodb://serai_poc_production:$3@34.92.118.222:27017/serai_poc_production"

function checkHealth() {
  isOk=$(mongo --quiet "$1" --eval "db.stats()" | grep -c '"ok" : 1')
  if [ "$isOk" = 1 ]; then
    dbStatus="$dbStatus\033[1;39;42m $3 $2 Database $3 \033[0m
\033[1;39;42m =====    alive    ===== \033[0m
\033[1;39;42m =====  `date +%H:%m:%S`   ===== \033[0m\n\n"
    else
      dbStatus="$dbStatus\033[1;39;41m $3 $2 Database $3 \033[0m
\033[1;39;41m =====    down     ===== \033[0m
\033[1;39;41m =====  `date +%H:%m:%S`   ===== \033[0m\n\n"
  fi
}

function checkNikeExistence() {
  res=$(mongo --quiet "$1" --eval "db.customers.find({})")
  hasCustomer=$(echo "$res" | grep -c "Sustainable Stitch Group")
  if [ "$hasCustomer" = "1" ]; then
    dbStatus="$dbStatus\033[1;39;42m $3 $2 Database $3 \033[0m
\033[1;39;42m ==Customer exists ===== \033[0m
\033[1;39;42m =====  `date +%H:%m:%S`   ===== \033[0m\n\n"
    else
      dbStatus="$dbStatus\033[1;39;41m $3 $2 Database $3 \033[0m
\033[1;39;41m ===== went wrong  ===== \033[0m
\033[1;39;41m =====  `date +%H:%m:%S`   ===== \033[0m\n\n"
  fi
}

while true;
do
  dbStatus=""
  checkHealth $ciUrl "ci" "====="
  checkNikeExistence $previewUrl "preview" "==="
  checkNikeExistence $productionUrl "production" "="
  clear
  echo -e "$dbStatus"
sleep 1
done
