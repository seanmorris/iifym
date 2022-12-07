import { Database } from 'curvature/model/Database';

export class ProductDatabase extends Database
{
	_version_1(database)
	{
		const productStore = this.createObjectStore('products', {keyPath: 'upc'});

		productStore.createIndex('upc', 'upc', {unique:true});
	}
}
