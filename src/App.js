import React from "react";
import PropTypes from "prop-types";
import "./css/App.scss";

function App({
  width, height, contentType, subheadline, headline, headlineSize, callToAction, logoLockUp, logoLockUpSize, featureImageExist}) {
    
    const placeholderBkg = {
      backgroundImage: `url(https://cdn.jsdelivr.net/gh/OutfitDelivery/cloudera-digi-advert2-make-template@master/src/assets/Placeholder/${width/4}x${height/4}.png)`,
    };

    const appStyle = {
      width: `${width}px`,
      height: `${height}px`,
      '--headline-size': `${headlineSize}`,
      '--logo-lockup-size': `${logoLockUpSize}`,
    };

    const formatTags = (text) => {
      /* [break] */
      let formatAll = (text)=>{
        var bold_regex = /\[bold\](.*?)\[bold\]/gi;
        text = text.replaceAll(bold_regex, "<strong>$1</strong>");
        text = text.replaceAll("[break]", "<br/>");
        text += width + " + " + height;
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

    <div>
      <div className="App" style={appStyle} data-width={width/4} data-height={height/4} >
            <div className="placeholder" style={placeholderBkg}></div>
            <div className="text-area" data-text-type={contentType} data-feature-image-exist={featureImageExist} ref={el=>maxHeight(el)}>
              <div className="headerArea">
                {conditionalTextCheck(<div>{ formatTags(logoLockUp) }</div>, "logoLockUp")}
              </div>
              <div className="contentArea">
                {conditionalTextCheck(<h2>{ formatTags(subheadline) }</h2>, "subheadline")}
                {conditionalTextCheck(<h1><span>{ formatTags(headline) }</span></h1>, "headline")}
                {conditionalTextCheck(<div><span>{callToAction}</span></div>, "call-to-action")}
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
  contentType: PropTypes.string, 
  subheadline: PropTypes.string, 
  headline: PropTypes.string, 
  headlineSize: PropTypes.string,
  callToAction: PropTypes.string,
  logoLockUp: PropTypes.string,
  logoLockUpSize: PropTypes.string,
  featureImageExist: PropTypes.string
};

App.defaultProps = {
  width:4800,
  height:3600, 
  contentType: "logoLockUp", 
  subheadline: "Forrester study", 
  headline: "USE REAL-TIME[break]STREAMING DATA TO[break]MAKE CRITICAL[break]BUSINESS DECISIONS", 
  headlineSize: "100",
  callToAction: "",
  logoLockUp: "On Demand",
  logoLockUpSize: "100",
  featureImageExist: true
};


export default App;
