# discord-pin-threads

## Installation

* [Nix](https://nixos.org/download.html)
* [direnv](https://github.com/direnv/direnv)

```sh
nix profile install github:direnv/direnv
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
eval "$(direnv hook bash)"
```

## Usage

```sh
echo "DISCORD_BOT_TOKEN=xxxxxxxxxxxxxxxxxxxx" > .env.local
direnv allow
yarn install
yarn node index.js
```

This unarchives threads with titles that end with `*` when archived