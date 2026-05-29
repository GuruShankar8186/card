FROM caddy:2.11.3

COPY Caddyfile /etc/caddy/Caddyfile
COPY . /usr/share/caddy

EXPOSE 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
