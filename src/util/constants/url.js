export const HEROKU_FRONT_URL = 'https://fox-clothing.herokuapp.com'
export const BACKEND_URL = process.env.NODE_ENV === 'production' ? HEROKU_FRONT_URL : 'http://localhost:3000/'
export const BACKEND_IMAGE_URL = process.env.NODE_ENV === 'production' ? HEROKU_FRONT_URL : 'http://localhost:3000/imgs'
export const FRONTEND_URL = process.env.NODE_ENV === 'production' ? HEROKU_FRONT_URL : 'http://localhost:8080'