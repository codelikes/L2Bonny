import {injectable} from 'tsyringe';
import {LoginServerConfigureOptions, LoginServerEnterOptions} from '../types/options';
import * as net from 'net';
import {map, Observable} from 'rxjs';
import {SocketBus} from './socket-bus';

@injectable()
export class LoginService {
    private options?: LoginServerConfigureOptions & LoginServerEnterOptions;
    private socketClient: net.Socket = new net.Socket();
    private readonly bus$: Observable<Buffer>;

    constructor() {
        this.bus$ = SocketBus.make(this.socketClient);
    }

    configure(options: LoginServerConfigureOptions & LoginServerEnterOptions) {
        this.options = options;
    }

    enter$(): Observable<Buffer> {
        if (!this.options) {
            throw {
                message: 'Для конфигурации клиента, вызовите LoginService.configure метод'
            }
        }

        this.socketClient.connect({port: this.options.port, host: this.options.host}, () => this.onConnect());

        return this.getBus$();
    }

    getBus$(): Observable<Buffer> {
        return this.bus$.pipe();
    }

    private onConnect() {
    }
}

