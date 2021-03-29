export interface IConfig {
  port: number;
  host: string;
  username: string;
  password: string;
  database: string;
}

const config: IConfig =  {
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'book',
}

export { config };