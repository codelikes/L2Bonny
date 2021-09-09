import "reflect-metadata"
import {container} from 'tsyringe';
import {App} from './src/App';
import {config as envConfigure} from 'dotenv'


envConfigure();
const instance = container.resolve(App);
