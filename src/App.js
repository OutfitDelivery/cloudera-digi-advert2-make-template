import React from "react";
import PropTypes from "prop-types";
import "./css/App.scss";


function App({
  width, height, contentType, subheadline, headline, headlineSize, callToAction}) {
    
    const appStyle = {
      width: `${width}px`,
      height: `${height}px`,
    };

    const placeholderBkg = {
      backgroundImage: `url(https://cdn.jsdelivr.net/gh/OutfitDelivery/cloudera-digi-advert1-make-template@master/src/assets/Placeholder/${width/4}x${height/4}.png)`,
    };

    //Checks to see if text has content and adds breaks if [break] exists
    function conditionalTextCheck(text, classList){
      classList += " text-el";
      /*let textChild = text.props.children;
      try{textChild = textChild.props.children} catch(e){}

      if(textChild === "" || textChild === "null") return "";

      //Update [break] to <br>
      textChild = textChild.split("[break]").join("<br>");
      if((text.props.children).props === undefined){
        text.props.children = textChild;
      } else{
        (text.props.children).props.children = textChild;
      }
      */
      return <div className={classList}>{text}</div>;
    }

    function maxHeight(el){
      if(!((width === 1280 && height === 200) || (width === 1200 && height === 200))){
        let elHeight = parseInt(window.getComputedStyle(el).height) - parseInt(window.getComputedStyle(el).paddingTop) - parseInt(window.getComputedStyle(el).paddingBottom);
        let maxheight = window.getComputedStyle(el).maxHeight;
        if(parseInt(elHeight) >= parseInt(maxheight)){
          el.className = "overflow text-area";
        }
      }
    }

    var htmlStructure = (

<div data-headline-size={headlineSize}>
      <div className="App" style={appStyle} data-width={width/4} data-height={height/4}>
            <div className="placeholder" style={placeholderBkg}></div>
            <div className="text-area" data-text-type={contentType} ref={el=>maxHeight(el)}>
              {conditionalTextCheck(<h2>{subheadline}</h2>, "subheadline")}
              {conditionalTextCheck(<h1><span>{headline}</span></h1>, "headline")}
              {conditionalTextCheck(<p>{callToAction}</p>, "call-to-action")}
          </div>
      </div>
      </div>
    );
  
  return htmlStructure;
}

App.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number, 
  contentType: PropTypes.string, 
  subheadline: PropTypes.string, 
  headline: PropTypes.string, 
  headlineSize: PropTypes.string,
  callToAction: PropTypes.string,
};

App.defaultProps = {
  width:2400,
  height:1260, 
  contentType: "subheadline", 
  subheadline: "TEST SUBHEADLINE", 
  headline: "How to drive machine[break]platform that lets you", 
  headlineSize: "1",
  callToAction: "Watch",
};


export default App;
