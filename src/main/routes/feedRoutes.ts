import { Router } from 'express'

export default (router: Router): void => {
  router.post('/feed', (req, res) => {
    res.json({ ok: 'ok' })
  })
}