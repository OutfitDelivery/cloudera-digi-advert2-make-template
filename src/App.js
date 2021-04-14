import React from "react";
import PropTypes from "prop-types";
import "./css/App.scss";

function App({
  width, height, contentType, subheadline, headline, headlineSize, callToAction, logoLockUp, logoLockUpSize, featureImageExist}) {
    
    const placeholderBkg = {
      backgroundImage: `url(https://raw.githubusercontent.com/OutfitDelivery/cloudera-digi-advert2-make-template/main/src/assets/Placeholder/${width/4}x${height/4}.png)`,
    };

    const appStyle = {
      width: `${width}px`,
      height: `${height}px`,
      '--headline-size': `${headlineSize}`,
      '--logo-lockup-size': `${logoLockUpSize}`,
    };

    const formatTags = (text) => {
      /* [break] */
      if(text !== null && text.toString().toLowerCase() !== null) {
        let formatAll = (text)=>{
          var bold_regex = /\[bold\](.*?)\[bold\]/gi;
          text = text.replaceAll(bold_regex, "<strong>$1</strong>");
          text = text.replaceAll("[break]", "<br/>");
          return {__html: text}
        }
        return <div dangerouslySetInnerHTML={ formatAll(text) }></div>;
      }
      else {
        return "";
      }
    }

    //Checks to see if text has content and adds breaks if [break] exists
    function conditionalTextCheck(text, classList, optionalContent){
      classList += " text-el";
      if(optionalContent !== null && optionalContent.toString().toLowerCase() !== "null") {
        const return_element = <div className={classList} ref={el=>fixCallToAction(el)}>{text}</div>;
        return return_element;
      }
      else {
        return "";
      }
    }

    function maxHeight(el){
      // if(!((width === 1280 && height === 200) || (width === 1200 && height === 200))){
      //   let elHeight = parseInt(window.getComputedStyle(el).height) - parseInt(window.getComputedStyle(el).paddingTop) - parseInt(window.getComputedStyle(el).paddingBottom);
      //   let maxheight = window.getComputedStyle(el).maxHeight;
      //   if(parseInt(elHeight) >= parseInt(maxheight)){
      //     el.className = "overflow text-area";
      //   }
      // }
    }

    function fixCallToAction(el) {
      if(el.classList.contains("call-to-action") && width/4 === 728 && height/4 === 90) {
        var superParentElement = el.parentNode.parentNode;
        var thisElement = el;
        el.remove();
        superParentElement.appendChild(thisElement);
      }
    }

    var htmlStructure = (

    <div>
      <div className="App" style={appStyle} data-width={width/4} data-height={height/4} >
            <div className="placeholder" style={placeholderBkg}></div>
            <div className="text-area" data-text-type={contentType} data-feature-image-exist={featureImageExist} ref={el=>maxHeight(el)}>
              <div className="headerArea">
                {conditionalTextCheck(<div>{ formatTags(logoLockUp) }</div>, "logoLockUp", logoLockUp)}
              </div>
              <div className="contentArea">
                <div className="mainContents">
                  {conditionalTextCheck(<h2>{ formatTags(subheadline) }</h2>, "subheadline", subheadline)}
                  {conditionalTextCheck(<h1><span>{ formatTags(headline) }</span></h1>, "headline", headline)}
                  {conditionalTextCheck(<div><span>{callToAction}</span></div>, "call-to-action", callToAction)}
                </div>
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
  featureImageExist: PropTypes.bool
};

App.defaultProps = {
  width: 540 * 4,
  height: 200 * 4, 
  contentType: "call-to-action", 
  subheadline: "Forrester study", 
  headline: "use real-time[break]streaming data to[break]make critical[break]business decisions", 
  headlineSize: "100",
  callToAction: null,
  logoLockUp: null,
  logoLockUpSize: "100",
  featureImageExist: true
};


export default App;
