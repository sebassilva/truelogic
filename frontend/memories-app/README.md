# Memories
This project is divided in two sub-projects. The first one is the Angular 9 project which is under /frontend folder. 
The second one is the dJango 3.0 project which is under /api folder. This uses Django Rest Framework and SQLite. 
I decided to put both projects on the same folder to use only one git repo.



## Memories frontend


### Frontend server
First we have to install the modules: 
```shell
cd frontend/memories-app/
npm install
```

To serve the project run: 
```shell
ng serve
```
which will open a connection on: 
`http://localhost:4200/`.

You can change the Google API Key on the index.html file.


##  Backend
First make sure you are using python >= 3.6.

```shell
python --version
```

Create a virtual environment 
```shell
py -m venv apienv

```
Activate your virutal environment. You should see something like (apienv) on your terminal. 
If you are using windows: 
```shell
./apienv\Scripts\activate.bat
```

for linux linux 
```shell
source apienv/bin/activate
```

Install all libraries:
```shell
pip install -r requirements.txt
```

Run the migrations wich will create the database structure
```shell
python manage.py makemigrations
```
Run the server, 
django will run on port 8000 of localhost.

```shell
python manage.py runserver
```

Fill the information. 

## Considerations
- For production purposes we coould use a more robust database such as PostgreSQL
- Improve the design of the site
- Set the variables on .env files or use a different service to provide secret keys



Estimated development time: 5 horas.
