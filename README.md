# React + TypeScript App
This is a template for creating a React application using TypeScript and following best practices. The application structure, GitFlow, Docker setup, Redux integration, Axios usage, user authorization with Auth0, CRUD operations for managing users, and CRUD operations for managing companies are included. Additionally, the application has validation rules and permissions for editing user and company information.

- Technologies Used
- React
- TypeScript
- Redux
- Axios
- Auth0
- Docker
- Docker Compose
- Chart.js
- Jest
- React Testing Library
- GitHub actions


# Prerequisites
## Make sure you have the following software installed on your machine:

- Node.js
- npm (Node package manager)
- Docker (optional

### Hello! Let`s go started

You can check deployed project here:
[http://mymeduzzenbucket.s3-website-ap-northeast-1.amazonaws.com/](http://mymeduzzenbucket.s3-website-ap-northeast-1.amazonaws.com/)

To run project in your device follow this few steps:

1. Open command prompt in folder, where you want your app to be located, after this enter command:
```
git clone https://github.com/Danoonka/meduzzen-frontend-internship.git
```


2. Go to the aplication directory: open project in IDE and open treminal here, enter next command:
```
cd my-app
```


3. Install all dapendencies: stay in the terminal and type the next one: 
```
npm install --save-dev
```


4. After all dependencies has downloaded, enter this command to run React app:
```
npm start
```


5. Now your brouser will automatically open the page, if nothing change, open your brouser and type in search string:
[http://localhost:3000/](http://localhost:3000/)


### Congratulations! Have a nice surfing!

## 

### Let`s try with docker!

requirments:
- Docker(latest version)

1. Follow 1-3 steps from previous instruction

2. Build project image. Use command:
```
docker build -t <container name>
```
3. Run project image by command:
```
docker run -e WATCHPACK_POLLING=true -v <full path to project>:/app -d -p 3000:3000 --name <container name> <image name>
```
4. Type in search string, and wait few minutes:
[http://localhost:3000/](http://localhost:3000/)

5. To start with exist user, you can try this credits

```
login: testUser15@gmail.com

password: 12345678
```

Or create your own account.


# Conclusion
You now have a React application template with TypeScript, Redux, Axios, Auth0 integration, CRUD operations for managing users and companies, validation rules, permissions for editing user and company information, Docker setup, and GitHub Pages deployment. Feel free to modify the structure and customize the application to meet your specific requirements. Happy coding!


