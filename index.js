#! /usr/bin/env node

const fs = require('fs-extra')
const path = require('path')
const program = require('commander')
const chalk = require('chalk')
const envinfo = require('envinfo')
const inquirer = require('inquirer')
const execa = require('execa')

const isObject = val => val && typeof val === 'object'

program
    .version(require('./package.json').version)
    .usage('<command> [options]')

program
    .command('info')
    .description('Print debugging information about your environment')
    .action(() => {
      console.log(chalk.bold('\nEnvironment Info:'));
      envinfo.run({
        System: ['OS', 'CPU', 'Memory', 'Shell'],
        Binaries: ['Node', 'Yarn', 'npm'],
        Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
        Utilities: ['Git'],
        Servers: ['Nginx', 'Apache'],
        IDEs: ['Atom', 'Vim', 'VSCode', 'Nano', 'Xcode'],
        Languages: ['Bash', 'Go', 'Java', 'PHP', 'Python', 'Ruby', 'Rust'],
        Databases: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite']
      }, {
        showNotFound: true,
        duplicates: true,
        fullTree: true,
        console: true
      })
    })

program
    .command('create <app-name>')
    .description('create a new project')
    .action((name, cmd) => {
      fs.ensureDirSync(name)
      create(name)
    })

program.parse(process.argv)

async function create(name) {
  const answers = await inquirer.prompt([
    {
      name: 'features',
      when: true,
      type: 'checkbox',
      message: 'Check the features needed for your project:',
      choices: [
        { name: 'DApp', value: 'dapp' },
        { name: 'Electron', value: 'electron' },
        { name: 'PWA', value: 'pwa' },
        { name: 'SPA', value: 'spa' },
        { name: 'MPA', value: 'mpa' },
        { name: '后台管理系统', value: 'admin' },
        { name: '响应式', value: 'responsive' },
        { name: '多语言', value: 'intl' },
        { name: '服务端', value: 'server' },
        { name: '测试', value: 'test' },
        { name: '组件', value: 'component' },
        { name: 'VuePress', value: 'vuepress' }
      ],
      pageSize: 20
    }
  ])
  const plugins = {}
  answers.features.forEach(f => plugins[f] = true)

  console.log('✨ Creating project.')

  const cliDir = path.dirname(process.mainModule.filename)
  const targetDir = path.resolve(process.cwd(), name)

  let dependencies = [], devDependencies = []
  // Copy 组件
  if (plugins.component) {
    fs.copySync(path.resolve(cliDir, 'templates/component'), targetDir)
    devDependencies.push(...['less', 'rollup', 'rollup-plugin-node-resolve', 'rollup-plugin-commonjs', 'rollup-plugin-less', 'rollup-plugin-vue', 'terser', 'vue-template-compiler'])
    install(targetDir, dependencies, devDependencies)
    return
  }

  // Copy VuePress
  if (plugins.vuepress) {
    fs.copySync(path.resolve(cliDir, 'templates/vuepress'), targetDir)
    return
  }

  // Copy general
  fs.copySync(path.resolve(cliDir, 'templates/general'), targetDir)
  dependencies.push('core-js')
  devDependencies.push(...['@vue/cli-plugin-babel', '@vue/cli-service', 'eslint', 'babel-eslint', 'eslint-plugin-html', 'eslint-plugin-vue', 'less-loader', 'lovue', '@lovue/utils', 'vue', 'vue-template-compiler'])

  const pkgPath = path.resolve(targetDir, 'package.json')
  const vueConfigPath = path.resolve(targetDir, 'vue.config.js')
  let pkg = require(pkgPath)
  pkg.name = name

  // Merge DApp
  if (plugins.dapp) {
    fs.copySync(path.resolve(cliDir, 'templates/dapp'), targetDir, {
      overwrite: false
      /*filter(src, dest) {
        if (src.endsWith('package.json')) return false
        return true
      }*/
    })
    devDependencies.push(...['truffle-contract', 'truffle-hdwallet-provider', 'web3'])
  }

  // Merge Electron
  if (plugins.electron) {
    dependencies.push(...['electron', 'electron-is', 'electron-log', 'electron-store'])
    devDependencies.push(...['vue-cli-plugin-electron-builder'])

    const electronPkg = require(path.resolve(cliDir, 'templates/electron/package.json'))
    pkg = extendPackage(pkg, electronPkg)

    const vueConfig = fs.readFileSync(path.resolve(cliDir, 'templates/electron/vue.config.js'))
    fs.appendFileSync(vueConfigPath, '\n')
    fs.appendFileSync(vueConfigPath, vueConfig)
  }

  // Merge PWA
  if (plugins.pwa) {
    fs.copySync(path.resolve(cliDir, 'templates/pwa'), targetDir, {
      overwrite: false
    })
    devDependencies.push(...['@vue/cli-plugin-pwa', 'register-service-worker'])

    const vueConfig= fs.readFileSync(path.resolve(cliDir, 'templates/pwa/vue.config.js'))
    fs.appendFileSync(vueConfigPath, '\n')
    fs.appendFileSync(vueConfigPath, vueConfig)
  }

  // Merge SPA
  if (plugins.spa) {
    fs.copySync(path.resolve(cliDir, 'templates/spa'), targetDir, {
      overwrite: false
    })
    devDependencies.push(...['vue-router', 'vuex'])
  }

  // Merge 后台管理系统
  if (plugins.admin) {
    fs.copySync(path.resolve(cliDir, 'templates/admin'), targetDir, {
      overwrite: false
    })

    const vueConfig = fs.readFileSync(path.resolve(cliDir, 'templates/admin/vue.config.js'))
    fs.appendFileSync(vueConfigPath, '\n')
    fs.appendFileSync(vueConfigPath, vueConfig)
  }

  // Merge 响应式
  if (plugins.responsive) {
    fs.copySync(path.resolve(cliDir, 'templates/responsive'), targetDir, {
      overwrite: false
    })
  }

  // Merge 多语言
  if (plugins.intl) {
    fs.copySync(path.resolve(cliDir, 'templates/intl'), targetDir, {
      overwrite: false
    })
  }

  // Merge 多页面项目
  if (plugins.mpa) {
    fs.copySync(path.resolve(cliDir, 'templates/mpa'), targetDir, {
      overwrite: false
    })

    const vueConfig = fs.readFileSync(path.resolve(cliDir, 'templates/mpa/vue.config.js'))
    fs.appendFileSync(vueConfigPath, '\n')
    fs.appendFileSync(vueConfigPath, vueConfig)
  }

  // Merge 服务端
  if (plugins.server) {
    fs.copySync(path.resolve(cliDir, 'templates/server'), targetDir, {
      overwrite: false
    })
    dependencies.push(...['esm', 'jsonwebtoken', 'nodemailer', 'restify', 'sequelize'])
  }

  // Merge 测试
  if (plugins.test) {
    fs.copySync(path.resolve(cliDir, 'templates/test'), targetDir, {
      overwrite: false
    })
    devDependencies.push(...['@vue/cli-plugin-e2e-cypress', '@vue/test-utils', 'chai', 'jest', 'jest-serializer-vue', 'vue-jest'])
  }

  pkg = sortPkg(pkg)
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

  console.log('🗃 Initializing git repository')
  await execa.command('git init', { cwd: targetDir })
  install(targetDir, dependencies, devDependencies)
}

async function install(cwd, dependencies, devDependencies) {
  if (dependencies.length) {
    await execa.command(`npm install ${dependencies.join(' ')}`, { cwd })
  }
  if (devDependencies.length) {
    await execa.command(`npm install -D ${devDependencies.join(' ')}`, { cwd })
  }
}


function extendPackage(src, ex) {
  for (let k in ex) {
    const value = ex[k]

    if (src[k] === undefined) {
      src[k] = value
      continue
    }

    if (Array.isArray(value)) {
      src[k].push(...value)
      continue
    }

    if (isObject(value)) {
      src[k] = extendPackage(src[k], value)
    }
  }

  return src
}

function sortPkg(pkg) {
  pkg.dependencies = sortObject(pkg.dependencies)
  pkg.devDependencies = sortObject(pkg.devDependencies)
  pkg.scripts = sortObject(pkg.scripts, [
    'serve',
    'build',
    'test',
    'e2e',
    'lint',
    'deploy'
  ])
  pkg = sortObject(pkg, [
    'name',
    'version',
    'private',
    'description',
    'author',
    'scripts',
    'main',
    'module',
    'browser',
    'jsDelivr',
    'unpkg',
    'files',
    'dependencies',
    'devDependencies',
    'peerDependencies',
    'vue',
    'babel',
    'eslintConfig',
    'prettier',
    'postcss',
    'browserslist',
    'jest'
  ])

  return pkg
}

function sortObject(obj, order) {
  if (!obj) return

  const res = {}

  if (order) {
    order.forEach(key => {
      res[key] = obj[key]
    })
    return res
  }

  const keys = Object.keys(obj)
  keys.sort()
  keys.forEach(key => {
    res[key] = obj[key]
  })

  return res
}
