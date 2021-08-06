import { NestFactory } from '@nestjs/core';
import express from 'express';
import path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //const staticRoute = path.join(__dirname, '/../public')
  const express = require('express');
  const cors = require('cors');
  app.use(cors());
  app.use('/sources', express.static(__dirname + '/../public'));
  app.enableCors();
  
  await app.listen(3000);
}
bootstrap();
