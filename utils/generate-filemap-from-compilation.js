const path = require('path')

module.exports = (compilation) => {
    if (typeof compilation !== 'object') return undefined

    const filemap = {}
    const stats = (typeof compilation.getStats === 'function')
        ? compilation.getStats()
        : compilation

    for (let id in stats.compilation.chunks) {
        const o = stats.compilation.chunks[id]
        if (typeof o.name === 'undefined' || o.name === null) continue
        if (Array.isArray(o.files)) {
            o.files
                .filter(filename => !/\.(js|css)\.map$/i.test(filename))
                .forEach(filename => {
                    const extname = path.extname(filename)
                    const file = o.name + extname
                    if (typeof filemap[file] !== 'string')
                        filemap[file] = filename
                })
        }
    }
    return filemap
}
