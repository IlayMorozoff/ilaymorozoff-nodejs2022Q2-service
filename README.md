# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


For Users, Artists, Albums, Tracks and Favorites REST endpoints with separate router paths should be created
Users (/user route)

GET /user - get all users
Server should answer with status code 200 and all users records
GET /user/:id - get single user by id
Server should answer with status code 200 and and record with id === userId if it exists
Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
POST /user - create user (following DTO should be used) CreateUserDto
    interface CreateUserDto {  
      login: string; 
      password: string;
    }
Server should answer with status code 201 and newly created record if request is valid
Server should answer with status code 400 and corresponding message if request body does not contain required fields
PUT /user/:id - update user's password
UpdatePasswordDto (with attributes):
interface UpdatePasswordDto {  
  oldPassowrd: string; // previous password
  newPassword: string; // new password
}
Server should answer with status code 200 and updated record if request is valid
Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
Server should answer with status code 403 and corresponding message if oldPassowrd is wrong
DELETE /user/:id - delete user
Server should answer with status code 204 if the record is found and deleted
Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
Tracks (/track route)

GET /track - get all tracks
Server should answer with status code 200 and all tracks records
GET /track/:id - get single track by id
Server should answer with status code 200 and and record with id === trackId if it exists
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist
POST /track - create new track
Server should answer with status code 201 and newly created record if request is valid
Server should answer with status code 400 and corresponding message if request body does not contain required fields
PUT /track/:id - update track info
Server should answer with status code 200 and updated record if request is valid
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist
DELETE /track/:id - delete track
Server should answer with status code 204 if the record is found and deleted
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist
Artists (/artist route)

GET /artist - get all artists
Server should answer with status code 200 and all artists records
GET /artist/:id - get single artist by id
Server should answer with status code 200 and and record with id === artistId if it exists
Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist
POST /artist - create new artist
Server should answer with status code 201 and newly created record if request is valid
Server should answer with status code 400 and corresponding message if request body does not contain required fields
PUT /artist/:id - update artist info
Server should answer with status code 200 and updated record if request is valid
Server should answer with status code 400 and corresponding message if artist is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist
DELETE /artist/:id - delete album
Server should answer with status code 204 if the record is found and deleted
Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist
Albums (/album route)

GET /album - get all albums
Server should answer with status code 200 and all albums records
GET /album/:id - get single album by id
Server should answer with status code 200 and and record with id === albumId if it exists
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === albumId doesn't exist
POST /album - create new album
Server should answer with status code 201 and newly created record if request is valid
Server should answer with status code 400 and corresponding message if request body does not contain required fields
PUT /album/:id - update album info
Server should answer with status code 200 and updated record if request is valid
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === albumId doesn't exist
DELETE /album/:id - delete album
Server should answer with status code 204 if the record is found and deleted
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === albumId doesn't exist
Favorites

GET /favs - get all favorites
Server should answer with status code 200 and all favorite records (not their ids), split by entity type:
interface FavoritesRepsonse{
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
POST /favs/track/:id - add track to the favorites
Server should answer with status code 201 and corresponding message if track with id === trackId exists
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
Server should answer with status code 422 and corresponding message if track with id === trackId doesn't exist
DELETE /favs/track/:id - delete track from favorites
Server should answer with status code 204 if the track was in favorites and now it's deleted id is found and deleted
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if corresponding track is not favorite
POST /favs/album/:id - add album to the favorites
Server should answer with status code 201 and corresponding message if album with id === albumId exists
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
Server should answer with status code 422 and corresponding message if album with id === albumId doesn't exist
DELETE /favs/album/:id - delete album from favorites
Server should answer with status code 204 if the album was in favorites and now it's deleted id is found and deleted
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if corresponding album is not favorite
POST /favs/artist/:id - add artist to the favorites
Server should answer with status code 201 and corresponding message if artist with id === artistId exists
Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
Server should answer with status code 422 and corresponding message if artist with id === artistId doesn't exist
DELETE /favs/artist/:id - delete artist from favorites
Server should answer with status code 204 if the artist was in favorites and now it's deleted id is found and deleted
Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if corresponding artist is not favorite
For now, these endpoints should operate only with in-memory (hardcoded) data, in the next tasks we will use a DB for it. You should organize your modules with the consideration that the data source will be changed soon.

An application/json format should be used for request and response body.

Do not put everything in one file - use a separate file for application creation (bootstrapping), for controllers (routers) and code related to business logic. Also split files to different modules depends on a domain (user-related, artist-related, etc...).

User's password should be excluded from server response.

When you delete Artist, Album or Track, it's id should be deleted from favorites (if was there) and references to it in other entities should become null. For example: Artist is deleted => this artistId in corresponding Albums's and Track's become null + this artist's id is deleted from favorites, same logic for Album and Track.

Non-existing entity can't be added to Favorites.

To run the service npm start command should be used.

Service should listen on PORT 4000 by default, PORT value is stored in .env file.

Incoming requests should be validated.

You can fix and use OpenAPI file in doc folder.

## in order to run this application, you must follow the following instructions

1. Clone this repository (``git clone {url this repository}``) or pull postgres images and applications from dockerhub (with ``docker pull morozoff1994/ilaymorozoff-nodejs2022q2-service_postgres`` and ``docker pull morozoff1994/ilaymorozoff-nodejs2022q2-service_app`` commands)

2. If you have cloned the repository from github, then you need to run the build of docker images with the command `docker:build`

3. if suddenly, by some chance, the database is not initialized by entities from the application, it is recommended to go inside the application with the command ``docker exec -it {docker container id}`` (you can get the docker container id with the ``docker ps -a`` command), thereby you will get into an interactive terminal, and you can run migrations with the ``npm run migration command:run`` and in this case the database is initialized by entities from the application

4. You can run a script to search for npm vulnerabilities in the images of this project with the command `docker:scan:app`, `docker:scan:db`

