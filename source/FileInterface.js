class FileInterface {
    readArchiveContent() {
        return Promise.reject(new Error("Not implemented"));
    }

    readFile(fileID) {
        return Promise.reject(new Error("Not implemented"));
    }

    readFileIndex() {
        return Promise.reject(new Error("Not implemented"));
    }
}

module.exports = FileInterface;
