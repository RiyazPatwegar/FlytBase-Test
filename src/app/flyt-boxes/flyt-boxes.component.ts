import { Component, OnInit, HostListener, ViewEncapsulation, Input  } from '@angular/core';

// Keyboard Key Code to be used up, right, down, left
export enum KEY_CODE {
  DOWN_ARROW = 40,
  RIGHT_ARROW = 39,
  UP_ARROW = 38,
  LEFT_ARROW = 37
}

// global variables
let selectedRectangle = '';
let moveByMarginByPixel = 5;

@Component({
  selector: 'app-flyt-boxes',
  templateUrl: './flyt-boxes.component.html',
  styleUrls: ['./flyt-boxes.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FlytBoxesComponent implements OnInit {  

  limitTOLeftRight: any = 950;
  limitToUpDown: any = 380;
  checked: any = true;

 constructor() { }

  ngOnInit() {    
  }
    
  rectangles = 1;
  margin = 10; 
    
  controlKeyboard(){    
    this.checked = !this.checked;
  }

  // draw rectangle on click create box button
  drawBox() {

    this.margin = this.margin +15;  
    let box = document.createElement('span');   
    box.className = 'boxes';
    let count = this.rectangles++;
    box.id = 'boxes_'+count;
    box.style.zIndex = count.toString();
    box.style.display = 'block';
    box.style.marginLeft = this.margin.toString();
    box.addEventListener('click', this.selectDiv);
    
    box.innerHTML = ` 
    <br> 
    Rectangle `+count+``; 

    document.querySelector('.drawArea').appendChild(box); 
  }

  // get reference of selected rectangle to global variable
  selectDiv(e){
    let id = e.target.id;
    selectedRectangle = id;
    
    /* remove privious highlighted css*/
    let allBoxes =  document.getElementsByClassName('boxes');
    for (let i = 0; i < allBoxes.length; i++) 
    {
      allBoxes[i].classList.remove('highlightedBorder');
      allBoxes[i].classList.add('hideBorder');
    }

    /* highlight selected rectange  */
    document.getElementById(selectedRectangle).classList.add('highlightedBorder');    
  }

  // hostlistner to get capture keyboard events
  @HostListener('window:keydown', ['$event'],)
  keyEvent(event: KeyboardEvent) {    

    /* check can use keyboard keys */
    if(this.checked == false){
      return false;
    }

    /* return if no rectangle selected */
    if(selectedRectangle == ''){
      return false;
    }

    /*  calculated existing rectangle postion and move according to arrow keys */
    let marg = document.getElementById(selectedRectangle);
    let style = getComputedStyle(marg);
    let marginLeft = parseInt(style.marginLeft);
    let marginTop = parseInt(style.marginTop);    
    let newMarg = marginLeft + moveByMarginByPixel;

    /* move selected rectangle towords right side */
    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {      
      if( newMarg <= this.limitTOLeftRight){        
        let px = newMarg+'px';
        document.getElementById(selectedRectangle).style.marginLeft = px;
      }
    }

    /* move selected rectangle towords left side */
    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      let newMarginLeft = marginLeft - moveByMarginByPixel;
      if( newMarginLeft >= 0){        
        let px = newMarginLeft+'px';
        document.getElementById(selectedRectangle).style.marginLeft = px;
      }
    }

    /* move selected rectangle downwords */
    if (event.keyCode === KEY_CODE.DOWN_ARROW) {
      let newMarginTop = marginTop + moveByMarginByPixel;
      if( newMarginTop <= this.limitToUpDown){        
        let px = newMarginTop+'px';
        document.getElementById(selectedRectangle).style.marginTop = px;
      }
    }

    /* move selected rectangle towords upper side */
    if (event.keyCode === KEY_CODE.UP_ARROW) {
      let newMarginTop = marginTop - moveByMarginByPixel;
      if( newMarginTop >= 0){        
        let px = newMarginTop+'px';
        document.getElementById(selectedRectangle).style.marginTop = px;
      }
    }
  }

}
