# discord-pin-threads

## Installation

```sh
nix profile install github:direnv/direnv
echo 'eval "$(direnv hook bash)"' >> ~/.bashrc
```

## Usage

```sh
direnv allow
DISCORD_BOT_TOKEN=xxxxxxx yarn node index.js
```

This unarchives threads with titles that end with `*` every hour