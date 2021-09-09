import net from 'net';
import {Observable} from 'rxjs';

export class SocketBus {
    static make(socketClient: net.Socket): Observable<Buffer> {
        return new Observable<Buffer>(subscriber => {
            socketClient.on('data', (data) => subscriber.next(data));
        });
    }
}
