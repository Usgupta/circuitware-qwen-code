# Custom Branding Guide

This guide explains how to customize the branding of the Circuitware CLI while maintaining compatibility with upstream changes.

## Environment Variables

The CLI supports the following environment variables for custom branding:

- `CLI_APP_NAME`: Custom application name (default: "Qwen")
- `CLI_ASCII_SHORT`: Custom short ASCII art
- `CLI_ASCII_LONG`: Custom long ASCII art
- `CLI_ASCII_TINY`: Custom tiny ASCII art

## Running with Custom Branding

### Method 1: Using Environment Variables

```bash
CLI_APP_NAME="Circuitware" npm run start
```

Or with all ASCII art:

```bash
CLI_APP_NAME="Circuitware" \
CLI_ASCII_SHORT="$(cat << 'EOF'
YOUR_SHORT_ASCII_ART_HERE
EOF
)" \
CLI_ASCII_LONG="$(cat << 'EOF'
YOUR_LONG_ASCII_ART_HERE
EOF
)" \
CLI_ASCII_TINY="$(cat << 'EOF'
YOUR_TINY_ASCII_ART_HERE
EOF
)" \
npm run start
```

### Method 2: Using the Custom Script

```bash
npm run run:custom
```

### Method 3: Using npm scripts

```bash
npm run start:custom
```

## Building with Custom Branding

```bash
npm run build:custom
```

## Maintaining Upstream Compatibility

To keep your customizations while staying compatible with upstream changes:

1. Fork the repository
2. Use environment variables for branding (as shown above)
3. When pulling upstream changes:
   ```bash
   git fetch upstream
   git merge upstream/main
   ```
4. Resolve any conflicts in your custom files
5. Test the application to ensure everything works correctly

## Custom ASCII Art

To create custom ASCII art:

1. Use a tool like [TAAG](http://patorjk.com/software/taag/) to generate ASCII art
2. Set it using the environment variables shown above
3. Or modify the `CircuitwareAsciiArt.ts` file directly

This approach allows you to maintain your custom branding while easily integrating upstream changes.
