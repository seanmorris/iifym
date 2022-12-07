import { View } from 'curvature/base/View';
import { Bindable } from 'curvature/base/Bindable';

export class Pie extends View
{
	template = require('./pie.html');

	constructor(args, parent)
	{
		super(args, parent);

		this.args.wedges = [];

		this.args.segments = this.args.segments || [];
	}

	onRendered()
	{
		const values = this.args.segments.map(s => s.value);

		const normalized = this.normalize(...values);
		
		let sweep = 0;

		for(const i in normalized)
		{
			const n = normalized[i];
			const segment = this.args.segments[i];

			const wedge   = Bindable.make({value: 0, sweep: 0, type: segment.type});

			this.args.wedges.push(wedge);

			const s = sweep;

			this.onTimeout(200, () => {
				wedge.value = n;
				wedge.sweep = s;
			});

			sweep += n;
		}
	}

	normalize(...inputs)
	{
		return inputs.map(i => i / inputs.reduce((a,b) => a+b));
	}

	getArc(x, y, radius, startAngle, endAngle)
	{
		var start = this.getOffset(x, y, radius, endAngle);
		var end   = this.getOffset(x, y, radius, startAngle);

		var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

		return [
			'M', radius, radius 
			, 'L', start.x, start.y 
			, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
		].join(' ');       
	}

	getOffset(x, y, radius, degrees)
	{
		const radians = (degrees - 90) * Math.PI / 180.0;

		return {
			x: x + radius * Math.cos(radians),
			y: y + radius * Math.sin(radians)
		};
	}
}