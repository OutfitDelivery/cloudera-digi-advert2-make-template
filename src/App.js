import React from "react";
import PropTypes from "prop-types";
import "./css/App.scss";

function App({
  width, height, contentType, subheadline, headline, headlineSize, callToAction}) {
    
    const placeholderBkg = {
      backgroundImage: `url(https://cdn.jsdelivr.net/gh/OutfitDelivery/cloudera-digi-advert2-make-template@master/src/assets/Placeholder/${width/4}x${height/4}.png)`,
    };

    const appStyle = {
      width: `${width}px`,
      height: `${height}px`,
    };

    const formatTags = (text) => {
      /* [break] */
      let formatAll = (text)=>{
        var bold_regex = /\[bold\](.*?)\[\/bold\]/gi;
        text = text.replaceAll(bold_regex, "<strong>$1</strong>");
        text = text.replaceAll("[break]", "<br/>");
        return {__html: text}
      }
      return <div dangerouslySetInnerHTML={ formatAll(text) }></div>;
    }

    //Checks to see if text has content and adds breaks if [break] exists
    function conditionalTextCheck(text, classList){
      classList += " text-el";
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
              {conditionalTextCheck(<h2>{ formatTags(subheadline) }</h2>, "subheadline")}
              {conditionalTextCheck(<h1><span>{ formatTags(headline) }</span></h1>, "headline")}
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
  contentType: "call-to-action", 
  subheadline: "Forrester study", 
  headline: "USE REAL-TIME STREAMING[break]DATA TO MAKE CRITICAL[break]BUSINESS DECISIONS", 
  headlineSize: "1",
  callToAction: "READ NOW",
};


export default App;
