import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchemaType = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
  STATIC_DIRECTORY_PATH: string;
  HOST: string;
}

export const configSchema = convict<ConfigSchemaType>({
  PORT: {
    doc: 'Incoming connections port',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_USER: {
    doc: 'Username for connecting to the database (MongoDB)',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Database connection password (MongoDB)',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port for connecting to the database (MongoDB)',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'course-nodejs-restapi'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for uploaded files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret for signing JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Path to static resources directory',
    format: String,
    env: 'STATIC_DIRECTORY_PATH',
    default: 'static'
  },
  HOST: {
    doc: 'Host where the service is started',
    format: String,
    env: 'HOST',
    default: 'localhost'
  }
});
