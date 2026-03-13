# Raspberry Pi Deployment

This project now supports running on Raspberry Pi (arm64) on your local network.

## Prerequisites on Pi

- Raspberry Pi OS 64-bit recommended
- Docker + Docker Compose plugin installed
- Pi and client devices on same LAN

## Option A: Build directly on the Pi (simplest)

1. Copy/clone this repo to the Pi.
2. Run:

```bash
cd isk-machine
docker compose up --build -d
```

3. Open from another device on your LAN:

- Frontend: `http://192.168.0.50:5173`
- Backend: `http://192.168.0.50:3000`

## Option B: Build images on your PC and transfer to Pi

Use this when you do not want to build on the Pi.

1. Build arm64 images on your PC (Docker Buildx):

```bash
cd isk-machine
docker buildx create --use --name pi-builder || true
docker buildx build --platform linux/arm64 -t isk-machine-site:latest ./site --target dev --load
docker buildx build --platform linux/arm64 -t isk-machine-backend:latest ./backend --target dev --load
```

2. Save images to tar:

```bash
docker save -o isk-machine-images.tar isk-machine-site:latest isk-machine-backend:latest
```

3. Copy to Pi and load:

```bash
scp isk-machine-images.tar pi@192.168.0.50:~/
ssh pi@192.168.0.50
docker load -i ~/isk-machine-images.tar
```

4. Start with Pi-specific compose:

```bash
cd ~/isk-machine
docker compose -f docker-compose.pi.yml up -d
```

If you ever change the Pi IP later, override at runtime:

```bash
PI_HOST=<NEW_PI_IP> docker compose -f docker-compose.pi.yml up -d
```

## Notes

- `docker-compose.yml` is your dev compose.
- `docker-compose.pi.yml` is image-only and better for deployment.
- The DB architecture pin (`linux/amd64`) was removed so Postgres can run natively on arm64.
- Frontend API URL is configurable with `VITE_API_BASE_URL` and defaults to the current host's IP/hostname.
- Backend CORS supports localhost and common private-LAN host patterns, plus explicit `FRONTEND_ORIGIN`.

## Verify

```bash
docker ps
docker compose -f docker-compose.pi.yml logs -f backend
docker compose -f docker-compose.pi.yml logs -f site
```

If the site loads but API calls fail, check browser devtools network tab and confirm requests go to `http://<PI_IP>:3000`.

With your current setup that should be `http://192.168.0.50:3000`.
