const config = {
  prod: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI
  },
  default: {
    SECRET: 'mySecret12',
    DATABASE: 'mongodb://localhost:27017/appLivres'
  }
}

exports.get = function get(env) {
  return config[env] || config.default
}
