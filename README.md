# Feed image with comments
[![Build Status](https://www.travis-ci.com/vagnerolliver/backend-image-feed.svg?branch=main)](https://www.travis-ci.com/vagnerolliver/backend-image-feed)
[![Coverage Status](https://coveralls.io/repos/github/vagnerolliver/backend-image-feed/badge.svg?branch=main)](https://coveralls.io/github/vagnerolliver/backend-image-feed?branch=main)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## Use Cases

### Create a feed image

#### Primary course (happy path)

1. ✅ Recive one request of type **POST** on route **/v1/feed**
2. ✅ **Create** a feed with data provided
3. ✅ Return **204**, without data

#### Error course (sad path):

1. ⛔️ Return error **404** if API doesnt exist
2. ✅ Return error **400** if url dont will provided by client
3. ✅ Return error **500** if error to try create feed image

### Load a list feeds image
#### Primary course (happy path)
1. ✅ Recive one request of type **GET** on route **/v1/feed**
2. ✅ **Load** a list of feeds
3. ✅ Return **200**, with data
4. ✅ Return **204**, without data
5. ✅ Return error **500** if error to try load feeds

#### Error course (sad path):

1. ⛔️ Return error **404** if API doesnt exist
3. ✅ Return error **500** if error to try create feed image

## Model Specs

### Feed Image

| Property      | Type                |
|---------------|---------------------|
| `id`          | `UUID`              |
| `description` | `String` (optional) |
| `location`    | `String` (optional) |
| `url`	        | `URL`               |


### Create a feed image comment

#### Primary course (happy path)

1. ⛔️ Recive one request of type **PUT** on route **/v1/feeds/{id}/comments**
2. ⛔️  Valida o parâmetro **feed_id**
3. ⛔️ **Cria** um comentario de feed com os dados fornecidos caso não tenha um registro
4. ⛔️ **Atualiza** um comentario de feed com dados fornecidos caso já tenha um registro

#### Error course (sad path):

1. ⛔️ Return error **404** if API doesnt exist
3. ⛔️ Retorna erro **403** se o feed_id passado na URL for inválido
5. ⛔️ Retorna erro **500** se der erro ao tentar criar o comentário do feed
6. ⛔️ Retorna erro **500** se der erro ao tentar atualizar o comentário do feed
7. ⛔️ Retorna erro **500** se der erro ao tentar carregar o comentário do feed


## Model Specs

### Feed Comments

| Property      | Type                    |
|---------------|-------------------------|
| `id`          | `UUID`                  |
| `FeedId`     | `UUID`                  |
| `messages`     | `String[]`                |
| `created_at`  | `Date` (ISO8601 String) |