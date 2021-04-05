import React from "react";
import PropTypes from "prop-types";
import "./css/App.scss";
import "./css/theme1.scss";
import "./css/theme2.scss";
import "./css/theme3.scss";
import "./css/theme4.scss";


function App({
  width, height, theme, contentType, subheadline, headlineLine1, headlineLine2, headlineLine3, headlineLine4, headlineLine5, headlineSize, displayLine, displayLineSize, displayLinePosition, callToAction}) {
    
    const appStyle = {
      width: `${width}px`,
      height: `${height}px`,
    };

    const placeholderBkg = {
      backgroundImage: `url(https://cdn.jsdelivr.net/gh/OutfitDelivery/cloudera-digi-advert1-make-template@master/src/assets/Placeholder/Theme${theme}/${width/4}x${height/4}.png)`,
    };

    //Checks to see if text has content and adds breaks if [break] exists
    function conditionalTextCheck(text, classList){
      classList += " text-el";
      let textChild = text.props.children;
      try{textChild = textChild.props.children} catch(e){}

      if(textChild == "" || textChild == "null") return "";

      //Update [break] to <br>
      textChild = textChild.split("[break]").join("<br>");
      console.log(text)
      if((text.props.children).props == undefined){
        text.props.children = textChild;
      } else{
        (text.props.children).props.children = textChild;
      }
      //try{(text.props.children).props.children = textContent} catch(e){}
      return <div className={classList}>{text}</div>;
    }

    function heightStuff(el, maxLine, name = null){
      let innerSpan = el.querySelector("span");
      let elHeight = window.getComputedStyle(el).height;
      let fontSize = innerSpan != null ? window.getComputedStyle(innerSpan).fontSize : window.getComputedStyle(el).fontSize;
      let lineHeight = innerSpan != null ? window.getComputedStyle(innerSpan).lineHeight : window.getComputedStyle(el).lineHeight;
      let limitHeight = parseFloat(lineHeight) * maxLine + (parseFloat(lineHeight) - 10);
      if(parseFloat(elHeight) > limitHeight){
        el.className = "overflow";
      }
    }

    function maxHeight(el){
      if(!((width == 1280 && height == 200) || (width == 1200 && height == 200))){
        let elHeight = parseInt(window.getComputedStyle(el).height) - parseInt(window.getComputedStyle(el).paddingTop) - parseInt(window.getComputedStyle(el).paddingBottom);
        let maxheight = window.getComputedStyle(el).maxHeight;
        if(parseInt(elHeight) >= parseInt(maxheight)){
          el.className = "overflow " + "text-area";
        }
      }
    }

    function between (lower, upper) {
      var scale = upper - lower + 1;
      return Math.floor(lower + Math.random() * scale);
    }

    var htmlStructure = (
      <div data-headline-size={headlineSize} data-display-line-size={displayLineSize}>
      <div className="App" data-theme={theme} style={appStyle}>
        <div data-width={width/4} data-height={height/4}>
            <div className="placeholder" style={placeholderBkg}></div>
            <div className="text-area" data-theme={theme} data-text-type={contentType} ref={el=>maxHeight(el)}>
            {conditionalTextCheck(<h2 ref={el=>{heightStuff(el, 3)}}>{subheadline}</h2>, "subheadline")}
            {displayLinePosition === "top" ? conditionalTextCheck(<h3 ref={el=>{heightStuff(el, 1.4)}}>{displayLine}</h3>, "display-line") : ""}
            <div className="heading">
              {/*ref={el=>{heightStuff(el, 1.4, "line1")}}*/}
              {conditionalTextCheck(<h1><span>{headlineLine1}</span></h1>, "headline line-1")}
              {conditionalTextCheck(<h1><span>{headlineLine2}</span></h1>, "headline line-2")}
              {conditionalTextCheck(<h1><span>{headlineLine3}</span></h1>, "headline line-3")}
              {conditionalTextCheck(<h1><span>{headlineLine4}</span></h1>, "headline line-4")}
              {conditionalTextCheck(<h1><span>{headlineLine5}</span></h1>, "headline line-5")}
            </div>
            {displayLinePosition === "bottom" ? conditionalTextCheck(<h3 ref={el=>{heightStuff(el, 1.4)}}>{displayLine}</h3>, "display-line") : ""}
            {conditionalTextCheck(<p ref={el=>{heightStuff(el, 1)}}>{callToAction}</p>, "call-to-action")}
          </div>
        </div>
      </div>
      </div>
    );
  
  return htmlStructure;
}

App.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number, 
  theme: PropTypes.number, 
  contentType: PropTypes.string, 
  subheadline: PropTypes.string, 
  headlineLine1: PropTypes.string, 
  headlineLine2: PropTypes.string, 
  headlineLine3: PropTypes.string, 
  headlineLine4: PropTypes.string, 
  headlineLine5: PropTypes.string, 
  headlineSize: PropTypes.string,
  displayLine: PropTypes.string, 
  displayLineSize: PropTypes.string,
  displayLinePosition: PropTypes.string,
  callToAction: PropTypes.string,
};

App.defaultProps = {
  width:2400,
  height:1260, 
  theme: 2,
  contentType: "heading-2", 
  subheadline: "", 
  headlineLine1: "How to drive machine[break]platform that lets you", 
  headlineLine2: "", 
  headlineLine3: "", 
  headlineLine4: "", 
  headlineLine5: "",
  headlineSize: "1",
  displayLine: "", 
  displayLineSize: "1",
  displayLinePosition: "bottom",
  callToAction: "Watch",
};


export default App;
