import { NestFactory } from '@nestjs/core';
import express from 'express';
import path from 'path';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //const staticRoute = path.join(__dirname, '/../public')
  app.use(
    session({
      secret: 'Secreto',
      resave: true,
      cookie: { maxAge: 60000 * 60 }, //60000 = (1 minuto)
      saveUninitialized: true
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  const express = require('express');
  const cors = require('cors');
  app.use(cors());
  app.use('/sources', express.static(__dirname + '/../public'));
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
