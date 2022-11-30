<!-- @format -->

# Visibility POC Health Check Scripts

### requirements

> brew install jq

> brew tap mongodb/brew

> brew install mongodb-community-shell

### Run

db-health-check.sh

```
bash ./health-check-scripts/db-health-check.sh <ci-password> <preview-password> <prod-password>
```

app-health-check.sh

> The official documentation does not work, so we **get cookie from the browser**. And it will expire in around 3 month.

```
bash ./health-check-scripts/app-health-check.sh <previewCookie> <productionCookie>
```
