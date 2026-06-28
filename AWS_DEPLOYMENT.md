# Deploying this site to AWS

This project is a **static single-page app** (Vite + React + TypeScript). On Railway
it's built with `npm run build` (Vite) and served with `vite preview`. There is **no
backend / API** — the output is just static files in `dist/`.

That matters for AWS: you do **not** need a running server. The cheapest, fastest, and
most reliable option is to serve the built files from **S3 behind CloudFront**. This
guide covers three paths, from easiest to most control:

| Option | Effort | Cost (low traffic) | When to use |
| --- | --- | --- | --- |
| **A. AWS Amplify Hosting** | Lowest | Free tier → ~$0–1/mo | Want Railway-like Git push-to-deploy, least config |
| **B. S3 + CloudFront** | Medium | ~$0.50–2/mo | Want full control, lowest cost, standard for static sites |
| **C. App Runner / ECS (container)** | Highest | ~$5–25/mo | Only if you truly want a running Node server (you don't need this) |

**Recommendation:** Start with **Option A (Amplify)** if you want the closest
experience to Railway. Choose **Option B (S3 + CloudFront)** if you want the canonical,
lowest-cost static-hosting setup and don't mind a bit more wiring.

---

## Project facts this guide assumes

- App source lives in `website-update/` (this is what Railway builds — see `railway.json`).
- Build command: `npm ci --legacy-peer-deps && npm run build`
- Build output directory: `website-update/dist/`
- It's a SPA using `react-router-dom`, so the host **must** redirect unknown paths to
  `/index.html` (otherwise deep links / refreshes 404).

> Note: there's also a near-identical copy in `Code/`. Railway deploys `website-update/`,
> so this guide uses that. Adjust the path if you switch to `Code/`.

---

## Prerequisites (one-time)

1. **AWS account** — https://aws.amazon.com/
2. **AWS CLI v2** installed and configured:
   ```bash
   # macOS
   brew install awscli
   aws configure   # enter Access Key, Secret, default region (e.g. us-east-1), output json
   ```
3. (Recommended) Create an **IAM user** with programmatic access instead of root keys.
4. Pick a region. Use **`us-east-1`** if you'll use CloudFront with a custom ACM
   certificate — ACM certs for CloudFront *must* live in `us-east-1`.

Verify:
```bash
aws sts get-caller-identity   # should print your account/user
node -v && npm -v             # build locally first to confirm it works
```

Build locally once to confirm everything is healthy before touching AWS:
```bash
cd website-update
npm ci --legacy-peer-deps
npm run build
npx vite preview              # open the printed localhost URL
```

---

## Option A — AWS Amplify Hosting (closest to Railway)

Amplify connects to your GitHub repo and redeploys on every push, just like Railway.
It handles build, CDN, HTTPS, and SPA redirects for you.

### A1. Console setup
1. Go to **AWS Amplify** → **Create new app** → **Host web app**.
2. Connect your **GitHub** repo and pick the branch (e.g. `main` or `Phase3`).
3. Amplify auto-detects a build. Because the app is in a **subdirectory**, set the
   app root to `website-update` (or override the build settings below).
4. Amplify provisions a URL like `https://<branch>.<id>.amplifyapp.com`.

### A2. Build settings (`amplify.yml`)
Put this in the **repo root** as `amplify.yml` so the build is reproducible:

```yaml
version: 1
applications:
  - appRoot: website-update
    frontend:
      phases:
        preBuild:
          commands:
            - npm ci --legacy-peer-deps
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
```

### A3. SPA redirect
Amplify usually auto-adds the SPA rewrite. If deep links 404, add this rule under
**App settings → Rewrites and redirects**:

| Source | Target | Type |
| --- | --- | --- |
| `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>` | `/index.html` | `200 (Rewrite)` |

### A4. Custom domain (optional)
**App settings → Custom domains** → add your domain. Amplify provisions the SSL cert
and DNS records automatically (or gives you the CNAME/ALIAS records to add at your
registrar).

✅ Done. Every `git push` to the connected branch redeploys automatically.

---

## Option B — S3 + CloudFront (canonical static hosting, lowest cost)

You upload the built `dist/` to an S3 bucket and put CloudFront (CDN + HTTPS) in front.

### B1. Build
```bash
cd website-update
npm ci --legacy-peer-deps
npm run build      # outputs to website-update/dist/
```

### B2. Create the S3 bucket
Bucket names are globally unique. Keep the bucket **private** — CloudFront will access
it via Origin Access Control (OAC). Do **not** enable public "static website hosting"
on the bucket if you use OAC (the modern, secure pattern below).

```bash
BUCKET=mihir-portfolio-site-$(date +%s)   # must be globally unique
REGION=us-east-1

aws s3api create-bucket \
  --bucket "$BUCKET" \
  --region "$REGION"
# For regions other than us-east-1, add:
#   --create-bucket-configuration LocationConstraint=$REGION

# Block all public access (CloudFront OAC will read it privately)
aws s3api put-public-access-block \
  --bucket "$BUCKET" \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
```

### B3. Upload the build
```bash
# Long-cache the fingerprinted assets, no-cache the HTML so deploys go live instantly
aws s3 sync dist/ "s3://$BUCKET/" --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html"

aws s3 cp dist/index.html "s3://$BUCKET/index.html" \
  --cache-control "no-cache"
```

### B4. Create the CloudFront distribution
Easiest via the **Console** (handles OAC + bucket policy for you):

1. **CloudFront → Create distribution.**
2. **Origin domain:** select your S3 bucket (choose the bucket, *not* the website
   endpoint).
3. **Origin access:** choose **Origin access control settings (recommended)** →
   **Create control setting** → save. CloudFront will show a bucket policy to copy.
4. **Default root object:** `index.html`.
5. **Viewer protocol policy:** Redirect HTTP to HTTPS.
6. Create the distribution, then **copy the generated bucket policy** into
   **S3 → your bucket → Permissions → Bucket policy**. It looks like:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [{
       "Sid": "AllowCloudFrontServicePrincipalReadOnly",
       "Effect": "Allow",
       "Principal": { "Service": "cloudfront.amazonaws.com" },
       "Action": "s3:GetObject",
       "Resource": "arn:aws:s3:::YOUR_BUCKET/*",
       "Condition": {
         "StringEquals": {
           "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
         }
       }
     }]
   }
   ```

### B5. SPA routing — redirect 403/404 to index.html
Because routing is client-side, requests for `/projects` etc. hit S3 and 404.
In the CloudFront distribution → **Error pages**, add two custom error responses:

| HTTP error code | Response page path | HTTP response code |
| --- | --- | --- |
| 403 | `/index.html` | 200 |
| 404 | `/index.html` | 200 |

### B6. Test
Open the CloudFront domain (`https://<id>.cloudfront.net`). Confirm the home page,
a deep link (refresh on a non-root route), and that assets load.

### B7. Custom domain + HTTPS (optional)
1. **ACM (in `us-east-1`)** → request a public cert for your domain; validate via DNS.
2. CloudFront distribution → **Alternate domain names (CNAMEs)** → add your domain;
   select the ACM cert.
3. At your DNS provider, point the domain (ALIAS/CNAME) at the CloudFront domain.
   If using Route 53, create an **A/AAAA Alias** record to the distribution.

### B8. Redeploy on changes
Each time you update the site:
```bash
cd website-update
npm run build
aws s3 sync dist/ "s3://$BUCKET/" --delete \
  --cache-control "public,max-age=31536000,immutable" --exclude "index.html"
aws s3 cp dist/index.html "s3://$BUCKET/index.html" --cache-control "no-cache"

# Invalidate the CDN cache so changes show immediately
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

---

## Automating deploys with GitHub Actions (recommended for Option B)

Mirror Railway's "push to deploy" with a workflow. Use **OIDC** (no long-lived keys).

1. In IAM, create a role trusted by GitHub's OIDC provider
   (`token.actions.githubusercontent.com`) with permission to `s3:PutObject`,
   `s3:DeleteObject`, `s3:ListBucket` on your bucket and
   `cloudfront:CreateInvalidation` on your distribution.
2. Add `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS
on:
  push:
    branches: [ main ]

permissions:
  id-token: write
  contents: read

jobs:
  deploy:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: website-update
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: website-update/package-lock.json

      - run: npm ci --legacy-peer-deps
      - run: npm run build

      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::ACCOUNT_ID:role/github-deploy-role
          aws-region: us-east-1

      - name: Sync to S3
        run: |
          aws s3 sync dist/ s3://YOUR_BUCKET/ --delete \
            --cache-control "public,max-age=31536000,immutable" --exclude "index.html"
          aws s3 cp dist/index.html s3://YOUR_BUCKET/index.html --cache-control "no-cache"

      - name: Invalidate CloudFront
        run: |
          aws cloudfront create-invalidation \
            --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

---

## Option C — Container on AWS App Runner / ECS (only if you want a running server)

You don't need this for a static site, but if you want parity with Railway's
"run `vite preview`" model, containerize it.

`website-update/Dockerfile`:
```dockerfile
# ---- build ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# ---- serve (static, via nginx) ----
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# SPA fallback so client-side routes work
RUN printf 'server {\n listen 80;\n root /usr/share/nginx/html;\n location / { try_files $uri /index.html; }\n}\n' \
  > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Deploy:
1. Build & push the image to **Amazon ECR**.
2. Create an **App Runner** service from the ECR image (port 80). App Runner gives you
   an HTTPS URL and auto-scaling with minimal config — it's the App Runner ≈ Railway
   equivalent.

> Cost note: App Runner bills for an always-on instance (~$5+/mo even idle), versus
> near-zero for S3/CloudFront. For a portfolio site, Option A or B is strongly preferred.

---

## Migration checklist (from Railway)

- [ ] Build succeeds locally (`cd website-update && npm ci --legacy-peer-deps && npm run build`)
- [ ] Chose a path: **A (Amplify)**, **B (S3+CloudFront)**, or **C (container)**
- [ ] Site loads at the AWS-provided URL
- [ ] **Deep links / refresh on a sub-route work** (SPA redirect configured)
- [ ] Custom domain pointed at AWS (if applicable) + HTTPS cert valid
- [ ] CI/CD redeploy on push working (Amplify auto, or GitHub Actions for S3)
- [ ] Verified everything, then **remove the Railway service** and delete `railway.json`
- [ ] Update DNS TTLs were low enough before cutover (to switch back quickly if needed)

---

## What to clean up after migrating

- `railway.json` (Railway-specific build/deploy config) can be deleted.
- The `"start": "vite preview ..."` script in `website-update/package.json` is only
  needed for Railway/server hosting. It's harmless to keep, but unused for Options A/B.

---

## Cost summary (rough, low-traffic portfolio)

| Path | Monthly estimate |
| --- | --- |
| Amplify Hosting | $0 within free tier, then ~build minutes + small GB-served |
| S3 + CloudFront | < $1–2 (S3 storage pennies + CloudFront free tier 1 TB/mo for 12 mo) |
| App Runner | ~$5+ (always-on) |

For a personal portfolio, **S3 + CloudFront** or **Amplify** will typically cost well
under a few dollars a month — often effectively free within AWS Free Tier.
