const fs = require('fs')

function findEntries(dir, target, parents = []) {
  const files = fs.readdirSync(dir, {
    withFileTypes: true
  })
  let result = {}

  for (let file of files) {
    if (file.name === target) {
      result[parents.join('/')] = `${dir}/app.js`
      continue
    }

    if (file.isDirectory()) {
      result = {
        ...result,
        ...findEntries(`${dir}/${file.name}`, target, [...parents, file.name])
      }
    }
  }

  return result
}


module.exports = {
  pages: {
    ...findEntries('src/pages', 'app.js'),
    home: {
      entry: 'src/pages/home/app.js',
      template: 'public/common.html',
      filename: 'home.html',
      title: '个人主页'
    }
  }
}
