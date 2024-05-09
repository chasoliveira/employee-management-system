# Employment-Management-System

Welcome to the Employment Management System. This system is designed to help you manage your employees and their information. You can add, delete, and update employees. You can also view all employees and search for employees by name or job title if you are an admin.

## Backend

This project was created using .Net Core with C#, and SQL Server for the backend. 
- The minimal API approach was used to create the API. It is a new approach to create APIs in .Net Core, and it is more lightweight than the traditional approach.
- The repository pattern was used to access the database, and avoid direct access to the database context.
- Services were created to handle the business logic when needed, like for authentication.
- The CQRS pattern was used to separate the read and write operations. Even though the project is small and has only one database, it allows for better separation of concerns and makes the code easier to maintain.
- Internal logic for generating the JWT was used for authentication and authorization. It would be better to use an Identity Provider (like Keycloak) to manage the users and the roles. For now, the system has only two roles: `Admin` and `User`.
- The database was created using Entity Framework Core, and the migrations were created using the `dotnet ef` CLI.
- Unit tests were created using `xUnit`, `Moq`, and `FluentAssertions`.
- Integration tests were created using xUnit and should use the `WebApplicationFactory` class, still under development.

The project structure was created to make it easier to maintain and add new features. 
The backend was split into six projects: `EMS.Api`, `EMS.Application`, `EMS.Domain`, `EMS.Infrastructure`, `EMS.UnitTests`, and `EMS.IntegrationTests`. It is a recommended approach to create a project for each layer of the application, to make it easier to maintain and add new features, according to the SOLID principles and Clean Architecture.

- The `EMS.Api` project is the main project, where the endpoints and the services are located and/or initialized. Also, in this project, there is a file `EMS.Api.Http` to run tests locally as you usually could do using `Postman` or `Swagger UI`. If you are using Visual Studio, you need to install an extension (`REST Client`) to run the requests.
- The `EMS.Domain` project contains the domain models and the interfaces. It is important to mention that the domain models are not the same as the database models. 
- The `EMS.Application` project contains the services and the mappers, and any validation that needs to be done before calling the repository methods. 
- The `EMS.Infrastructure` project contains the database context and the repository implementations. 
- The `EMS.UnitTests` project contains the tests for the services.
- The `EMS.IntegrationTests` project contains the tests for the endpoints, to make sure that the API is working as expected.

### Known Issues

  - The integration tests not developed yet.
  - The units tests are not covering all the code.
  - There are only two roles: `Admin` and `User`.

## Frontend

The frontend is a React application that uses TypeScript, through the use of the `vite` to build the project. To run the frontend, you will need to have Node.js installed on your machine.

- The `axios` was not used, instead a service was create to make the requests to the API. Since the project is small, it is easier to maintain the requests in one place.
- The `react-router-dom` was used to handle the routes. and the `react-router-guard` was not used to handle the routes protection due to the requirements of the project.
- The `react-hook-form` was used to handle the forms, along with the `yup` to validate the forms.
- The `material-ui` was used to style the components.

The folder structure was created thinking about the nature of react of being a build block system, so the components are organized in folders that denote it nature, like app hooks are inside of the `hooks` folder, and the pages are organized in the `pages` folder. The `services` folder contains the services that are used to make the requests to the API.

Also, to run locally make sure to configure the target api in the vite.config.ts file with the url and port correctly.

### Known Issues

  - The tests are not covering all the code.
  - The integration tests not developed yet.
  - If the rules for the roles change, the frontend will need to be updated.
  - The `react-hook-form` was not used in all the forms.
  - The `yup` was not used in all the forms.
  - Some styles need to be improved.

## Installation

To install the Employment Management System, you will need to clone the repository to your local machine. 
You will also need to install the required dependencies for the frontend and backend.

Both the frontend and backend can run in docker containers, so you will need to have Docker installed on your machine.
A docker-compose file is provided to make it easier to run the project.

So you can run the following command to start the project:

```bash
docker-compose up -d
```

The frontend will be running on `http://localhost:8080`, and the backend will be running on `http://localhost:5000`.
By default, a admin user will be created with the following credentials: Username: `admin`, Password: `admin@123`.
To create a new user, you can use the `POST /api/users/register` endpoint.

```bash
curl -X 'POST' \
  'http://localhost:5000/api/v1/users/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "username": "jhon_doe1",
  "password": "jhon@321"
}'
```

## Migrations

Run migration before execute the app:

```bash
dotnet ef database update
```

If you need to create a new migration, you can run the following command:

```bash
dotnet ef migrations add <MigrationName>
```

after that you can update the database with the previous command.

Instead of keeping the migration folder on the api project, I do prefer to keep it in the Infrastructure project, so I can use the same migrations in the tests, and dot add dependencies between the projects.


## Authentication & Authorization

The system uses JWT for authentication and authorization. The system has two roles: `Admin` and `User`. The `Admin` role has access to all the endpoints, while the `User` role has access to only the `GET` endpoints.

The Keycloak was used to manage the users and the roles. The Keycloak is running in a docker container, and the realm and the client were created using the Keycloak Admin API.

# VS Code Tests

If you are running over VSCode there a few tasks to improve the development experience.
- Run Unit tests: It will run all the unit tests in the UnitTest project and generate a report in the `TestResults` folder.
- Generate coverage report: It will generate a coverage report in the `TestResults` folder.

In order to run the tasks, you need to have the `dotnet` CLI installed in your machine. And also the `coverlet.msbuild` package installed in the test project, as well as the `ReportGenerator` tool.

```bash
dotnet tool install --global dotnet-reportgenerator-globaltool
```

After installing the tool, you can run the task `Run Unit tests` in the VSCode, by pressing `Ctrl+Shift+P` and typing `Tasks: Run Task` and selecting the task `Run Unit tests`.
To run the task `Generate coverage report` in the VSCode, by pressing `Ctrl+Shift+P` and typing `Tasks: Run Task` and selecting the task `Generate coverage report`.