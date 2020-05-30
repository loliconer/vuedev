import Sequelize from 'sequelize'
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'doc.db',
  define: {
    timestamps: false
  }
})

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database: ', err))

class user extends Sequelize.Model {}
class group extends Sequelize.Model {}

user.init({
  username: { type: Sequelize.TEXT, allowNull: false },
  groups: { type: Sequelize.TEXT, allowNull: false, defaultValue: 1 },
  roles: { type: Sequelize.TEXT, allowNull: false, defaultValue: 1 },
  avatar: Sequelize.TEXT,
  email: Sequelize.TEXT,
  mobile: Sequelize.TEXT,
  password: { type: Sequelize.TEXT, allowNull: false },
  lastLoginTime: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
}, { sequelize })

group.init({
  name: Sequelize.TEXT
}, { sequelize })

export const User = user
export const Group = group
