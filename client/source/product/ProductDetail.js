import { View } from 'curvature/base/View';
import { Pie } from '../chart/Pie';

export class ProductDetail extends View
{
	template = require('./product-detail.html');

	constructor(args, parent)
	{
		const debug = JSON.stringify(args, null, 4);
		
		super(args, parent);

		[this.args.title, this.args.subTitle] = String(this.args.item_name).split(', ');

		this.args.dailyCalories = 2000;

		this.args.netCarbs = this.args.nf_total_carbohydrate + -this.args.nf_dietary_fiber;
		this.args.complexCarbs = this.args.nf_total_carbohydrate + -this.args.nf_dietary_fiber + -this.args.nf_sugars;

		const segments = [
			{type: 'protein',  value: this.args.nf_protein}
			, {type: 'fat',    value: this.args.nf_total_fat}
			, {type: 'carbs',  value: this.args.complexCarbs}
			, {type: 'sugar',  value: this.args.nf_sugars}
		];

		this.args.servings = Array(this.args.nf_servings_per_container).fill(1);
		this.args.multiServing = 1;

		// this.args.alloc = this.args.nf_calories / this.args.dailyCalories * this.args.multiServing;

		this.args.bindTo('multiServing', v => {
			this.args.qtyServings = this.args.nf_serving_size_qty * v;
			this.args.calorieServings = this.args.nf_calories * v;
			this.args.alloc = this.args.nf_calories / this.args.dailyCalories * v;
			this.args.allocPercent = Number(this.args.alloc * 100).toFixed(2);
		});
		

		this.args.chart = new Pie({segments});

		this.args.debug = debug;
	}

	incServing() { this.args.multiServing++; }
	decServing() { this.args.multiServing = Math.max(1, -1 + this.args.multiServing); }
}