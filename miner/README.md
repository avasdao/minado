# Nexa Rocks WASM Miner

### To build for Web Assembly:

```
wasm-pack build --target web --no-typescript --release -d ../web/public/bin/
```

### To build for Windows:

```
cargo build --release --target=x86_64-pc-windows-gnu --verbose
```

### To build for Linux

```
cargo build --release
```
