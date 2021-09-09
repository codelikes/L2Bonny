import {LoginService} from './core/network/login.service';
import {injectable} from "tsyringe";

@injectable()
export class App {
    constructor(
        protected loginService: LoginService
    ) {
        this.loginService.configure({
            login: String(process.env.ACCOUNT_LOGIN),
            password: String(process.env.ACCOUNT_PASSWORD),
            host: String(process.env.LOGIN_SERVER_HOST),
            port: Number(process.env.LOGIN_SERVER_PORT),
            // protocolVersion: 746
        });

        this.loginService.enter$()
            .subscribe(data => {
                console.log('Init packet from login server: ');
                console.log(data);
            });
    }
}

