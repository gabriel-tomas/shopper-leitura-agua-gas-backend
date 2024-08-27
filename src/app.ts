import dotenv from 'dotenv';
import { resolve } from 'path';
import express, { Application, Request, Response } from 'express'; 
import helmet from 'helmet';
import knexFile from '../knexfile';
import knex from 'knex';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

export const knexMySQL = knex(knexFile);

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseConnection();
    this.middleware();
    this.routes();
  }

  private databaseConnection(): void {
    knexMySQL.raw("SELECT 1").then(() => {
      console.log('Conexão com DB obtida com sucesso!');
      this.app.emit('database_connected');
    })
    .catch((err) => {
      console.log('ERROR: erro na conexão com o DB');
      console.error(err);
    });
  }

  private middleware(): void {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'public')));
  }

  private routes(): void {
    this.app.use('/', (req: Request, res: Response) => {
      res.send('oi');
    });
  }
}

export default new App().app;
