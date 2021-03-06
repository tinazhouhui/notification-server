# PHRASEE BACK END TECHNICAL TEST
## To run
```shell
docker compose up
```

## To populate with seed data
- to use different seed data, save seed data as `data.json` in the `seed` folder
```shell
# run inside the docker container
npm run seed
```

## Endpoint design
### 1. Retrieve an aggregated list of notifications for a given post
`GET /notifications/:postId`

request example
`http://localhost:5000/notifications/b1638f970c3ddd528671df76c4dcf13e`

response example
```json
{
    "notifications": {
        "likes": 2,
        "comments": 1,
        "total": 3
    },
    "likes": [
        {
            "id": "b1638f970c3ddd528671df76c4dcf13e4c18d43d4deccbac21a26c55f1033f53",
            "user": {
                "id": "4c18d43d4deccbac21a26c55f1033f53",
                "name": "William Hunt"
            }
        },
        {
            "id": "b1638f970c3ddd528671df76c4dcf13e38be3079117301f2f61264d6e0fbf7db",
            "user": {
                "id": "38be3079117301f2f61264d6e0fbf7db",
                "name": "An Mao"
            }
        }
    ],
    "comments": [
        {
            "id": "46f72ffb3a5717dcd71e26369d1e13a5",
            "text": "Acme remains one of my fave company ever! The way they scale is so dynamic that makes HTML5 look static!",
            "user": {
                "id": "5497afbf9df3f6ff6f9ba11cdef5310f",
                "name": "Suoma Narjus"
            }
        }
    ]
}
```

### 2. POST method that will add an element to this feed of notifications
`POST /notifications/:type`
request example
`http://localhost:5000/notifications/like`
```json
{
  "post": {
    "id": "57e0d6328c9287bd1b66bc327efbcdfa"
  },
  "user": {
    "id": "38be3079117301f2f61264d6e0fbf7db"
  }
}
```

response example - list of notifications that were added to the stream
```json
{
    "newNotifications": [
        {
            "id": 22,
            "user": "1111myuniqueid2222"
        },
        {
            "id": 23,
            "user": "7305d0a8bb9d7166b8d26ca856930b8d"
        }
    ]
}
```

### 3. mark these feeds as read
`PUT notifications/:type/:id`

request example
`http://localhost:5000/notifications/like/22`

response example
```json
{
    "message": "like id 22 marked as read"
}
```

## Data Design
<img src="./images/dbschema.png">

### Decision for a relational database rather than just json
- upsert functionalities and schema validation
- ORM benefits
- easier to expand in the future, e.g. get my likes and comments
- more robust on closer to production ready

### Notification, Like, Comment table separation
- notification table holds all the notifications for all users
  - one comment on post can lead to the notification of multiple people, only the information that is needed is repeated
  - the user in the notification table is anyone BUT the author of the notification
- notification could be in the future just a file or in a nosql db to improve performance - speed might be more important

## Assumptions
- the data.json are notifications tailored for me
- cannot recreate the same like twice for one post

## To Improve
- better error handling
- validation of inputs
- tests
- have notifications and likes and comments tables loosely coupled - not dependent on foreign keys - this way if someone deletes the comment, the notificaiton history stays
- mark as read to accept an array rather than individual id
- improve the ids handling
  - mark as read api - comment ID or like ID vs notification ID

  
## Instructions
You are tasked with writing the algorithm that takes a feed of notifications and aggregates them. The
algorithm should be packaged in a web server that exposes three endpoints:
- The first endpoint will provide the functionality to retrieve an aggregated list of notifications for a
given post. We are looking for a response that is as close to production ready as possible.
- The second endpoint will expose a POST method that will add an element to this feed of
notifications.
- The third and last endpoint should expose the functionality to mark these feeds as read.

The notification feed is from a hypothetical social website that allows users to write posts, like posts
and comment on posts.

- The notifications can be of two types: Like and Comment.
- Like indicates that one user liked a user's post and Comment indicates that one user commented on a user's post.

You'll be provided with a file containing a JSON of the notifications feed.

Use your judgement for a suitable aggregation bearing in mind this will be displayed on a web UI.
Please note that the order in which the notifications are served or aggregated is irrelevant.

Please do not take more than approximately 4 HOURS on this test.
If you find you cannot complete it to your satisfaction, please write down how you would intend to
finish, we will take that into account.

The test results should be packaged either as a .zip file or as a link to a git repository.
