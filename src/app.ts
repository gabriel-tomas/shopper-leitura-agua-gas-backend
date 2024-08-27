import dotenv from 'dotenv';
import { resolve } from 'path';
import express, { Application, Request, Response } from 'express'; 
import helmet from 'helmet';

dotenv.config({ path: resolve(__dirname, '..', '.env') });

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.databaseConnection();
    this.middleware();
    this.routes();
  }

  private databaseConnection(): void {
    /*
    mongoose.connect(process.env.CONNECTIONSTRING as string)
      .then(() => {
        console.log('Conexão com DB obtida com sucesso!');
        this.app.emit('database_connected');
      })
      .catch((error) => {
        console.log('ERROR: erro na conexão com o DB');
        console.log(error);
      });
    */
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
