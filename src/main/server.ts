import { MongoHelper } from '../infra/db/mongodb/mongoHelper'

import env from './config/env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)

//   import app from './config/app'

// app.listen(5050, () => console.log('Server running at http://localhost:5050'))
