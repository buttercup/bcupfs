# BcupFS Architecture Specification

BcupFS is a format for storing Buttercup vaults within text files alongside encrypted attachments.

## File Structure

The first line will remain as the Buttercup archive encrypted contents as with historical file formats:

```
b~>buttercup/a4uYN+3eU3pUSNx7gpI9Wzz05kiG+t7CbyeP+W7IEvAj8rXJTBVkiaGungQ/exL+zsMZvsBenI+vqbwwAXBOSJf...
```

### File Index

Following the initial payload comes the file index:

```
@sec:index
f,e628cdc5-8376-4b68-9420-6d9f38845f92:1548267900755,X6OCVNOLpAZDQdkimo9a1ua5a4vgX3l1dWhT/g6POag=$67fa7d1b360a09595cd7711194668cd0$90+35t/I1UCI$4a4e50507abe6a2f5c2c8789cbb216e505d11d17df541a586adf818f98dc9d0a$250000$cbc
f,3c599963-a200-4327-8765-ff097abd5818:1548268205620,O7pZ/Xt6yCjYzIniW/nQugPZsk8Rm3zkXT2+Y0cRaC+1r1Vi0fU9kB1NWWgS4KsL$7f47a379c1d9b1866401aa12d807d0ed$OX8vIpeeCJVH$ed108a05a7ae450557fe2b29c3894659bd72bf65c89f9ceea5dcccdcc637f846$250000$cbc
```

The file index contains files, 1 per line. Each item is in the following format:

```
(type),(UUID):(timestamp),(encrypted payload)
```

The `(type)` is a single-character item type indicator. At the time of writing only `f` is supported, for File. The `(UUID)` value is a randomly generated version-4 UUID, and the `(timestamp)` is a JavaScript timestamp, set when the file was _added_. The `(encrypted payload)` is an [iocane](https://github.com/perry-mitchell/iocane) encrypted JSON payload which resembles the following:

```json
{
    "filename": "my-secret-document.pdf",
    "size": 146209,
    "encrypted_size": 232193,
    "mime": "application/pdf",
    "mtime": "2019-01-23T20:02:51.853Z",
    "birthtime": "2019-01-23T20:02:51.853Z",
    "mode": "rwxr-xr-x"
}
```

| Payload Property      | Description                                   |
|-----------------------|-----------------------------------------------|
| filename              | The filename of the attachment                |
| size                  | The size in bytes of the unencrypted file     |
| encrypted_size        | The size in bytes of the encrypted file       |
| mime                  | The file's MIME type                          |
| mtime                 | The file's modification time                  |
| birthtime             | The file's creation (addition) time           |
| mode                  | The file's permissions                        |

### Blobs

After the file index comes the blobs of file data, split into files:

```
@sec:file(e628cdc5-8376-4b68-9420-6d9f38845f92:1548267900755)
ˇÿˇ‡�JFIF��,,��ˇ·�ÙExif��MM�*����	�������z����
���Ä��������������é�������ñ(�������1�������û<�������≤ái�������¬����Canon�MP190 series����,�����,���Apple Image Capture�Apple Mac OS X���†�������†������	∞†������
¥����ˇÌ�8Photoshop 3.0�8BIM������8BIM%�����‘åŸè�≤ÈÄ	òÏ¯B~ˇ¿�
```

The encrypted files are written in-line as UTF-8 data, as output from iocane. The file ends when a new-line character is encountered before another `@sec` line (the new-line should be stripped) or the end of the file.
