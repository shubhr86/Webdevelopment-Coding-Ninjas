import express from 'express';

import UserController from './src/controllers/user.controller.js';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';

const app = express();

const usersController = new UserController();

app.use(ejsLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set(
  'views',

  path.join(path.resolve(), 'src', 'views')
);

app.get('/register', usersController.getRegister);
app.get('/login', usersController.getLogin);
app.post('/login', usersController.loginUser);
app.post('/register',usersController.addUser);

export default app;