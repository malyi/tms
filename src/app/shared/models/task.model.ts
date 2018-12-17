export class Task {
 constructor (
   public title: string,
   public description: string,
   public estimation: number,
   public tracked: number,
   public progress: number = 0,
   public user: object,
   private status: string = 'todo',
   public id?: number,
   private author: object = {
     'firstName': 'Kos',
     'lastName': 'Malyi',
     'email': 'k@g.com',
     'type': 'admin',
     'id': 2
   }
 ) {
 }
}
