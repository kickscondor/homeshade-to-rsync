# homeshade-to-rsync

Rsync output plugin for Homeshade.

## Installation

``` bash
$ npm install homeshade-to-rsync --save
```

## Options

You can configure this plugin in `config.yml`.

``` yaml
outputs:
  live:
    to: rsync
    destination: ssh://user@host.name:22/path/to/blog/
    delete: [true|false] # Default is true
    args: <rsync args>
    verbose: [true|false] # Default is true
    ignore_errors: [true|false] # Default is false
```

- **destination**: SSH connection string
- **delete**: Delete old files on remote host
- **args**: Rsync arguments
- **verbose**: Display verbose messages
- **ignore_errors**: Ignore errors

## License

MIT
