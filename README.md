
# Roboost - SMS

A Student Management System web application using Angular.
## Installation

Clone the project

```bash
  git clone https://github.com/abdelrahmman97/sms-web-app.git
```

Go to the project directory

```bash
  cd sms-web-app
```

Install dependencies

```bash
  npm install
```

## How to run locally

Start the server

```bash
  ng serve
```
or

```bash
  ng s -o
```
Navigate to ```http://localhost:4200/```
## Project structure and organization
```
sms-web-app/
|-- src/
|   |-- app/
|   |   |-- authentication/
|   |   |   |-- authentication-routing.module.ts
|   |   |   |-- authentication.module.ts
|   |   |   |-- login/
|   |   |   |-- register/
|   |   |-- student-management/
|   |   |   |-- student-management-routing.module.ts
|   |   |   |-- student-management.module.ts
|   |   |   |-- student-list/
|   |   |   |-- student-edit/
|   |   |   |-- student-create/
|   |   |-- core
|   |   |   |-- services/
|   |   |   |-- models/
|   |   |   |-- guards/
|   |   |   |-- interceptor/
|   |   |-- shared
|   |   |   |-- components
|   |   |   |   |-- header/
|   |   |-- app-routing.module.ts
|   |   |-- app.module.ts
|   |   |-- app.component.html
|   |   |-- app.component.ts
|   |   |-- app.component.css
|   |-- assets/
|   |-- environment/
|   |-- main.ts
|   |-- index.html
|   |-- styles.css
|-- angular.json
|-- package.json
|-- README.md
|-- tsconfig.json
```


## API Reference Used

#### Get all students 

```http
  GET /Student/Get
```


#### Get all students created by logged in user

```http
  GET /Student/GetAuthorized
```


#### Get student to show

```http
  GET /Student/GetByID?id=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of student to fetch |


#### Get student to edit

```http
  GET /Student/GetEditableByID?id=${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of student to fetch |


#### Create new student

```http
  POST /Student/POST
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `FirstName` | `string` | **Required**.  |
| `LastName` | `string` | **Required**.  |
| `Mobile` | `string` | **Required**.  |
| `Email` | `string` | **Required**.  |
| `NationalID` | `string` | **Required**.  |
| `Age` | `number` | **Required**.  |


#### Edit student

```http
  PUT /Student/PUT
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `NameArabic` | `string` | **Required**.  |
| `NameEnglish` | `string` | **Required**.  |
| `ID` | `number` | **Required**.  |
| `FirstName` | `string` | **Required**.  |
| `LastName` | `string` | **Required**.  |
| `Mobile` | `string` | **Required**.  |
| `Email` | `string` | **Required**.  |
| `NationalID` | `string` | **Required**.  |
| `Age` | `number` | **Required**.  |


#### Delet student

```http
  DELETE /Student/Delete
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `ID` | `number` | **Required**.  Id of student |



#### User login

```http
  POST /User/Login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `UserName` | `string` | **Required**.   |
| `Password` | `string` | **Required**.   |


#### User register

```http
  POST /User/POST
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Name` | `string` | **Required**.   |
| `UserName` | `string` | **Required**.   |
| `Password` | `string` | **Required**.   |

#### User logout

```http
  POST /User/Logout
```


## Additional libraries or dependencies used

| library  | link                       |
| :-------- | :-------------------------------- |
| `ngx-loading-bar`  | https://github.com/aitboudad/ngx-loading-bar 
| `ngx-translate` | https://github.com/ngx-translate/core  |
| `ngx-toastr` | https://github.com/scttcper/ngx-toastr  |
| `bootstrap` | https://getbootstrap.com/docs/  |
