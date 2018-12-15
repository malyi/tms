export class Task {
 constructor (
   public title: string,
   public description: string,
   public user: object,
   public id?: number,
   private status: string = 'todo',
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
