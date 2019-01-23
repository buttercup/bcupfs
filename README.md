# BcupFS
> Buttercup FileSystem for in-vault file storage and encryption

## About

BcupFS provides an interface to read files from Buttercup vault files as if in a naive filesystem. _Files_ are indexed by a unique ID, not their path as with standard file systems. Entries can refer to files via their IDs.

Read the [file structure specification](SPECIFICATION.MD) for more information on how Buttercup vault files are structured.
