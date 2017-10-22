import { ConfigureOptions } from 'ng4-configure/ng4-configure';

export class WpOptions extends ConfigureOptions {
    ConfigurationURL: string = 'assets/config.json';
    AppVersion: string = '0.0.1';
    BustCache: boolean = false
}