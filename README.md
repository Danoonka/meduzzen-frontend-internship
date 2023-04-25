# meduzzen-frontend-internship

### Hello! Let`s go started

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

### Happy codding!


