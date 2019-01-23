const FileInterface = require("./FileInterface.js");
const { createLineReader } = require("./lineReading.js");
const { isIndexSectionMarker, isSectionMarker } = require("./section.js");
const { indexLineToRecord } = require("./fileIndex.js");

class TextFileInterface extends FileInterface {
    constructor(fileContents) {
        this._contents = fileContents;
    }

    readArchiveContent() {
        return Promise.resolve().then(() => {
            const eol = this._contents.indexOf("\n");
            if (eol < 0) {
                return this._contents;
            }
            return this._contents.substr(0, eol);
        });
    }

    readFileIndex() {
        const indexItems = [];
        const lr = createLineReader(this._contents);
        let line,
            inSection = false;
        while ((line = lr.readLine()) !== null) {
            if (isIndexSectionMarker(line)) {
                inSection = true;
                continue;
            } else if (isSectionMarker(line)) {
                break;
            }
            if (inSection && /^[a-z]:/.test(line)) {
                indexItems.push(line);
            }
        }
        return indexItems.map(line => indexLineToRecord(line));
    }
}
