import { ProductDatabase } from './ProductDatabase';

export class ProductService
{
	static getByUpc(upc)
	{
		ProductDatabase.open('products', 1).then(database => {
			const query = {store:'products', index:'upc', range:upc, limit: 1};

			const select = database.select(query)
			.one(r => JSON.stringify(r, null, 4))
			.then(r => r.result || null)
		});

		return fetch(`https://iifym-products.unholyshit.workers.dev/?upc=${upc}`)
		.then(response => response.json())
		.catch(err => console.error(err));
	}
}