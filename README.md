# pwned-proxy-frontend

## Configuration

Copy `.env.local.example` to `.env.local` and adjust the variables as needed.

- `NEXT_PUBLIC_HIBP_PROXY_URL` sets the API location used by the start page and
  header link.
- `HIBP_API_KEY` provides the key required for server-side requests to the
  Have I Been Pwned API.

These variables ensure the application works locally and when deployed with
Coolify.
