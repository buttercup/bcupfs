function isIndexSectionMarker(line) {
    return /^@sec:index$/.test(line);
}

function isSectionMarker(line) {
    return /^@sec/.test(line);
}

module.exports = {
    isIndexSectionMarker,
    isSectionMarker
};
