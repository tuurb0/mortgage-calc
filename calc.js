var sliders = Array.prototype.filter.call(document.getElementsByClassName('slider'), function(slider){
    return slider.nodeName;
});


sliders.forEach(el => slide_run(el));

function load_defaults(slider) {

	var position = (slider.line.clientWidth * slider.percent) / 100;

	slider.active_line.style.width = position + "px";
	slider.circle.style.left = (position - (slider.circle.clientWidth / 2)) + "px";

	slider.value.setAttribute('value', slider.percent);

}

function slide_run(el) {

	var slider = {
		percent: document.getElementById(el.id).getAttribute('percent'),
		value: document.getElementById(el.id).querySelector('.slider-value__input'),
		circle: document.getElementById(el.id).querySelector('.slider-line__circle'),
		active_line: document.getElementById(el.id).querySelector('.slider-line__active-hr'),
		line: document.getElementById(el.id).querySelector('.slider-line__hr')

	}

	load_defaults(slider);

	slider.circle.onmousedown = function(e) {

		document.onmousemove = function(e) {

			var range_slide = {
				start: slider.line.getBoundingClientRect().left,
				end: slider.line.getBoundingClientRect().right
			}

			if ((e.pageX > range_slide.start) && (e.pageX < range_slide.end)) {
				slider.active_line.style.width = (e.pageX - range_slide.start)  + "px";
				slider.circle.style.left = ((e.pageX - range_slide.start) - (slider.circle.clientWidth / 2)) + "px";

				var calc_percent = Math.round(((e.pageX - range_slide.start) * 100) / (slider.line.clientWidth - 1));

				document.getElementById(el.id).setAttribute('percent', calc_percent);
				slider.value.setAttribute('value', calc_percent);
			}

			
	
  		}

  		document.onmouseup = function() {
		    document.onmousemove = null;
		    slider.circle.onmouseup = null;
		}

		slider.circle.ondragstart = function() {
			return false;
		}

	}

}
