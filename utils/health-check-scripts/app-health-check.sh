#The official document does not work, get the cookie directly from the browser
#https://vercel.com/docs/platform/frequently-asked-questions#bypassing-password-protection-programmatically

previewCookie="$1"
prodCookie="$2"

while true;
do
  appStatus=""
  res=$(curl -s --cookie "_vercel_jwt=$previewCookie" https://visibility-kin-serai-visibility.vercel.app/api/v1/health)
  verify=$(echo "$res" | jq -r 'has("version")')
  version=$(echo "$res" | jq -r '.version')
  uptime=$(echo "$res" | jq -r '.uptime')
  db_name=$(echo "$res" | jq -r '.db_name')
  if [[ $verify = "true" && $db_name = "serai_poc_preview" ]]; then
    appStatus="$appStatus\033[1;39;42m ====  preview   ==== \033[0m
\033[1;39;42m =====  $version   ===== \033[0m
\033[1;39;42m ===== `date +%H:%M:%S` ===== \033[0m
\033[1;39;42m == uptime: $uptime s == \033[0m
\033[1;39;42m = $db_name = \033[0m\n\n"
    else
      appStatus="$appStatus\033[1;39;41m ==== preview ==== \033[0m
\033[1;39;41m =====   done   ===== \033[0m
\033[1;39;41m = $db_name = \033[0m\n\n
\033[1;39;41m ===== `date +%H:%M:%S`  ===== \033[0m\n\n"
  fi

  res=$(curl -s --cookie "_vercel_jwt=$prodCookie" https://visibility.vercel.app/api/v1/health)
  verify=$(echo "$res" | jq -r 'has("version")')
  version=$(echo "$res" | jq -r '.version')
  uptime=$(echo "$res" | jq -r '.uptime')
  db_name=$(echo "$res" | jq -r '.db_name')
  if [[ $verify = "true" && $db_name = "serai_prod_preview" ]]; then
    appStatus="$appStatus\033[1;39;42m ==== production ==== \033[0m
\033[1;39;42m =====  $version   ===== \033[0m
\033[1;39;42m ===== `date +%H:%M:%S` ===== \033[0m
\033[1;39;42m == uptime: $uptime s == \033[0m
\033[1;39;42m = $db_name = \033[0m\n\n"
    else
      appStatus="$appStatus\033[1;39;41m ==== production ==== \033[0m
\033[1;39;41m =====   down   ===== \033[0m
\033[1;39;41m = $db_name = \033[0m\n\n
\033[1;39;41m ===== `date +%H:%M:%S`  ===== \033[0m\n\n"
  fi
  clear
  echo -e "$appStatus"
  sleep 1
done

