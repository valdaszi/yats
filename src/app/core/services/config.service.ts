import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { tap, shareReplay } from 'rxjs/operators'

import { ConfigsService } from '../models/services/configs.service'
import { Config } from '../models/data'

import { Logger } from '@app/core/services/logger.service'

const log = new Logger('ConfigService')

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config: Observable<Config>

  constructor(private configsService: ConfigsService) {
    this.config = this.configsService.general().valueChanges().pipe(
      tap(_ => log.debug('ConfigService executed')),
      shareReplay(1)
    )
  }

}
