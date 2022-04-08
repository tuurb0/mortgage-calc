let sliders = Array.prototype.filter.call(document.getElementsByClassName('slider'), function(slider){
    return slider.nodeName;
});

//find all sliders
sliders.forEach(el => __slider(el));

//create sliders
function __slider(el) {

	let slider_params = {
		percent: document.getElementById(el.id).getAttribute('value'),
		value: document.getElementById(el.id).querySelector('.slider-value__input'),
		line_width: document.getElementById(el.id).querySelector('.slider-line__hr'),
		step: document.getElementById(el.id).getAttribute('step')
	}

	let slider_elements = {
		active_line: document.getElementById(el.id).querySelector('.slider-line__active-hr'),
		circle: document.getElementById(el.id).querySelector('.slider-line__circle'),
    marks: document.getElementById(el.id).querySelector('.slider-line__markups')
	}


	//load params from html
	slider_params.value.setAttribute('value', slider_params.percent);
	__moving(slider_elements, Math.round((slider_params.percent * slider_params.line_width.clientWidth) / slider_params.step));
  
  let position_list = __load_positions(slider_params.line_width.clientWidth, slider_params.step);
  slider_elements.marks.innerHTML = __create_marks(slider_params.line_width.clientWidth, slider_params.step);

  //end load
  
	slider_elements.circle.onmousedown = function(e) {

		document.onmousemove = function(e) {


			let cursor_position = e.pageX - Math.round(slider_params.line_width.getBoundingClientRect().left);
			let position_list = __load_positions(slider_params.line_width.clientWidth, slider_params.step, slider_elements.circle.clientWidth);

			let nearest_value = position_list.find(it => Math.abs(it - cursor_position) === Math.min(...position_list.map(it => Math.abs(it - cursor_position))));
			let slider_value = Math.round((nearest_value / position_list[position_list.length - 1]) * slider_params.step);

			__moving(slider_elements, nearest_value);
      slider_elements.marks.innerHTML = __create_marks(slider_params.line_width.clientWidth, slider_params.step);

			slider_params.value.setAttribute('value', slider_value);
			
  		}

  		document.onmouseup = function() {
		    document.onmousemove = null;
		    slider_elements.circle.onmouseup = null;
		}

		slider_elements.circle.ondragstart = function() {
			return false;
		}

	}

}


//animation
function __moving(slider_element, value) {

	slider_element.active_line.style.width = value + "px";
	slider_element.circle.style.left = (slider_element.active_line.clientWidth - (slider_element.circle.clientWidth / 2)) + "px";

}


//convert value to px
function __load_positions(line_width, step) {

	let values = [];

	for (let i = 0; i <= step; i++) {
		values[i] = Math.round((line_width * (i)) / step);
	}
  
	return values;
}



//create marks
function __create_marks(line_width, step) {

  let inner_html = "";
  
  console.log(line_width);
  let margin = ((line_width - step) / step);
  
  let label_types = {
    simple: "slider-line__mark-line",
    label: "slider-line__mark-line--label"
  }
  
  for (let i = 0; i <= step; i++) {
      let mark_type = label_types.simple;
      if((i == 0) || (i == step)) { mark_type = label_types.label; }
      
      inner_html = inner_html + '<div class="slider-line__mark"><div class="'+ mark_type +'" style="left: '+ (margin * i) +'px;"></div></div>';
  }

  return inner_html;
}
