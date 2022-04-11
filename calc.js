let sliders = Array.prototype.filter.call(document.getElementsByClassName('slider'), function(slider){
    return slider.nodeName;
});

//load all sliders
sliders.forEach(el => __slider(el));

//create sliders
function __slider(el) {

	const slider_params = {
		line_width: document.getElementById(el.id).querySelector('.slider-line__hr'),
    min_val: Number(document.getElementById(el.id).getAttribute('min-value')),
    max_val: Number(document.getElementById(el.id).getAttribute('max-value')),
    step: Number(document.getElementById(el.id).getAttribute('step')),
    value: document.getElementById(el.id).getAttribute('value')
	}
   
	const slider_elements = {
		active_line: document.getElementById(el.id).querySelector('.slider-line__active-hr'),
		circle: document.getElementById(el.id).querySelector('.slider-line__circle'),
    marks: document.getElementById(el.id).querySelector('.slider-line__markups'),
    value_input: document.getElementById(el.id).querySelector('.slider-value__input')
	}



	//load params from html
	
  let position_list = __load_positions(slider_params.line_width.clientWidth, slider_params.step);
  
  slider_elements.value_input.setAttribute('value', slider_params.min_val);
  
  
  __moving(slider_elements, 0);
  slider_elements.marks.innerHTML = __create_marks(slider_params.line_width.clientWidth, slider_params.step);

  //end load params
  
  
  
	slider_elements.circle.onmousedown = function(e) {

		document.onmousemove = function(e) {


			let cursor_position = e.pageX - Math.round(slider_params.line_width.getBoundingClientRect().left);
			let position_list = __load_positions(slider_params.line_width.clientWidth, slider_params.step, slider_elements.circle.clientWidth);

			let nearest_value = position_list.find(it => Math.abs(it - cursor_position) === Math.min(...position_list.map(it => Math.abs(it - cursor_position))));
      let slider_value = Math.round(nearest_value / position_list[position_list.length - 1] * (slider_params.max_val - slider_params.min_val)) + slider_params.min_val;    
        
      //circle mooving
			__moving(slider_elements, nearest_value);
        
      //write marks
      slider_elements.marks.innerHTML = __create_marks(slider_params.line_width.clientWidth, slider_params.step);
			
      //set value to input
      slider_elements.value_input.setAttribute('value',  slider_value);
      
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

//convert steps to px
function __load_positions(line_width, step) {

	let steps = [];

	for (let i = 0; i <= step; i++) {
		steps[i] = Math.round((line_width * i) / step);
	}
  
  //console.log(steps);
	return steps;
}

//create marks
function __create_marks(line_width, step) {

  let inner_html = "";

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


//slide
function __load_settings(value, line_width) {
  console.log()
}


