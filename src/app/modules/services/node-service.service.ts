import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeServiceService {
  private node:Subject<Node> = new BehaviorSubject<any>([]);
  constructor() { }

  get node$(){
    return this.node.asObservable();
  }

  userActivated = new Subject();

	// Observable string sources
	private emitChangeSource = new Subject<any>();

	// Observable string streams
	changeEmitted$ = this.emitChangeSource.asObservable();

	// Service message commands
	emitChange(event: any) { console.log(event);
	    this.emitChangeSource.next(event);
	}
}
