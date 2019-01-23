function createLineReader(str) {
    const len = str.length;
    let index = 0;
    return {
        readLine() {
            if (index >= len) {
                return null;
            }
            const nextEOL = str.indexOf("\n", index);
            const line = nextEOL < 0 ? str.substring(index) : str.substring(index, nextEOL);
            index = nextEOL < 0 ? len : nextEOL + 1;
            return line;
        }
    };
}

module.exports = {
    createLineReader
};
