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
      this.httpClient.get('assets/dump.sql',{
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
          res.rows.array.forEach(food => {
            foods.push({id: food.id, foodName: food.foodName});
          });
        }
        this.foodList.next(foods);
      });
    }

    // CREATE
    addFood(foodName) {
      return this.storage.executeSql('INSERT INTO foods (foodName) VALUES (?)', [foodName])
      .then(res => {
        this.getFoods();
      });
    }

    // READ one
    getFood(id): Promise<Food> {
      return this.storage.executeSql('SELECT * FROM foods WHERE id = ?', [id]).then(res => ({
          id: res.rows.item(0).id,
          foodName: res.rows.item(0).foodName
        }));
    }

    // UPDATE
    updateFood(id, food: Food) {
      return this.storage.executeSql(`UPDATE foods SET foodName = ? WHERE id = ${id}`, [food.foodName]).then(_ => {
        this.getFoods();
      });
    }

    // DELETE
    deleteFood(id) {
      return this.storage.executeSql('DELETE FROM foods WHERE id = ?', [id]).then(_ => {
        this.getFoods();
      });
    }

}
