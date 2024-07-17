# Bento.me CNAME

This project enables users to bind a custom domain to their Bento.me personal pages using Cloudflare Workers.

[Live Example](https://getlalaloop.com)

### Prerequisites

1. Cloudflare Account
2. Cloudflare Workers

### Setup

#### 1. Clone the Repository

```sh
git clone https://github.com/Hopsken/bento-cname
cd bento-cname
```

#### 2. Install Wrangler CLI

Wrangler is a command-line tool to interact with Cloudflare Workers.

```sh
npm install -g @cloudflare/wrangler
```

#### 3. Authenticate Wrangler

```sh
wrangler login
```

#### 4. Configure

Edit `wrangler.toml` and add your bento.me username and domain you'd like to use.

```toml
route = { pattern = "your-own-domain.com", custom_domain = true }

[vars]
BENTO_USERNAME = 'your bento.me username'
```

#### 5. Deploy the Worker

```sh
wrangler publish
```

### License

This project is licensed under the MIT License.
