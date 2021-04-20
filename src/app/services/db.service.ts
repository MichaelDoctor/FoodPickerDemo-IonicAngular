import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Food } from './food';
// get local db file
import { HttpClient } from '@angular/common/http';
// get current db state by subscribing
import { BehaviorSubject, Observable } from 'rxjs';
// get data from SQLite using SQL or JSON
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
// Access SQLite db
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  foodList = new BehaviorSubject([]);

  private storage: SQLiteObject;
  private dbIsReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private platform: Platform, private sqlite: SQLite, private httpClient: HttpClient,
    private sqlPorter: SQLitePorter) {
      this.platform.ready().then(()=>{
        this.sqlite.create({
          name: 'foodpicker_db.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getData();
        });
      });
    }

    dbState() {
      return this.dbIsReady.asObservable();
    }

    fetchFoods(): Observable<Food[]> {
      return this.foodList.asObservable();
    }

    // load data from SQLite
    getData() {
      this.httpClient.get('assets/setup.sql',{
        responseType: 'text'
      }).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getFoods();
          this.dbIsReady.next(true);
        })
        .catch(err => {
          console.error(err);
        });
      });
    }

    // READ All
    getFoods() {
      return this.storage.executeSql('SELECT * from foods', []).then(res => {
        const foods: Food[] = [];
        if(res.rows.length > 0) {
          for(let i = 0; i < res.rows.length; i++) {
            foods.push({
              id: res.rows.item(i).id,
              foodName: res.rows.item(i).foodName
            });
          }
        }
        this.foodList.next(foods);
      });
    }

    // CREATE
    addFood(foodName: string) {
      return this.storage.executeSql('INSERT INTO foods (foodName) VALUES (?)', [foodName])
      .then(res => {
        this.getFoods();
      });
    }

    // READ one
    getFood(id: number): Promise<Food> {
      return this.storage.executeSql('SELECT * FROM foods WHERE id = ?', [id]).then(res => ({
          id: res.rows.item(0).id,
          foodName: res.rows.item(0).foodName
        }));
    }

    // UPDATE
    updateFood(id: number, food: string) {
      return this.storage.executeSql(`UPDATE foods SET foodName = ? WHERE id = ${id}`, [food]).then(_ => {
        this.getFoods();
      });
    }

    // DELETE
    deleteFood(id: number) {
      return this.storage.executeSql('DELETE FROM foods WHERE id = ?', [id]).then(_ => {
        this.getFoods();
      });
    }

}
