import Graph from '../components/Graphs/Graph'

/**
 * Function to extract the main thread time from scripts
 * @param {Array} scripts 
 * @returns {Array} - Array of objects containing the url of the script along with its main thread time. 
 */
function getMainThreadTime(scripts) {
  console.log(scripts);
  const result = scripts.map(script => {
    return {
      url: script.url,
      data: script.mainThreadTime
    }
  }).filter(script => script.data > 0);
  return result;
}

/**
 * Function to extract the render blocking time from scripts
 * @param {Array} scripts 
 * @returns {Array} - Array of objects containing the url of the script along with its render blocking time. 
 */
function getRenderBlockingTime(scripts) {
  const result = scripts.map(script => {
    return {
      url: script.url,
      data: script.blockingTime
    }
  }).filter(script => script.data > 0);
  return result;
}

function getTransferSize(scripts){
  const result = scripts.map(script => {
    return {
      url: script.url,
      data: script.transferSize
    }
  }).filter(script => script.data > 0);
  return result; 
}

function getResourceSize(scripts){
  const result = scripts.map(script => {
    return {
      url: script.url,
      data: script.resourceSize
    }
  }).filter(script => script.data > 0);
  return result;
}



/**
 * Function to generate the graph
 *
 * @param {Array} scripts - The data corresponding to the third party scripts
 * @param {String} value - The type of the graph to be generated
 * @returns {JSX} - The graph corresponding to the type of the graph requested by the user
 */
function generateGraph(scripts, value,type="doughnut") {
  console.log(scripts, value);
  const mainThreadTimeData = getMainThreadTime(scripts);
  const blockingTimeData = getRenderBlockingTime(scripts);
  const resourceSizeData=getResourceSize(scripts);
  const transferSizeData=getTransferSize(scripts)
  // If user requests blocking time graph
  if (value === "blocking") {
    if (blockingTimeData.length > 0) {
      return (
        <Graph type={type}
          title={"Main Thread Blocking Time"}
          data={blockingTimeData}
        ></Graph>
      );
    } else {
      return <></>;
    }
  }
  // If user requests resource size graph
  else if(value==="resource"){
    if (resourceSizeData.length > 0) {
      return (
        <Graph type={type}
          title={"Resource Size"}
          data={resourceSizeData}
        ></Graph>
      );
    } else {
      return <></>;
    }
  }

  // If user requests transfer size graph
  else if(value==="transfer"){
    if (transferSizeData.length > 0) {
      return (
        <Graph type={type}
          title={"Transfer Size"}
          data={transferSizeData}
        ></Graph>
      );
    } else {
      return <></>;
    }
  }

  // If user requests main thread time graph
  else {
    if (mainThreadTimeData.length > 0) {
      return (
        <Graph type={type} title={"Main Thread Time"} data={mainThreadTimeData} />
      );
    } else {
      return <></>;
    }
  }
}


/**
 * Function that returns the hostname of the url if its a valid url. Else it returns null
 * @param {String} url 
 * @returns hostname or null
 */
function getHostname(url){
    const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    return matches && matches[1];
}



function transformData(data){
  let thirdPartyScripts=[];
  let domainScripts=[];
  data.map(item=>{
    if(item.entityName){
      thirdPartyScripts=[...thirdPartyScripts,...item.subItems.items]
    }
    else{
      domainScripts=[...domainScripts,item.entity.url]
    }
    return {};
  });
  domainScripts=domainScripts.filter(script=>{
    return script!=='other';
  })

  thirdPartyScripts=thirdPartyScripts.filter(script=>{
    return typeof(script.url)==="string";
  });
  return {
    thirdPartyScripts,
    domainScripts,
    userInput:[]
  };
}


export{getHostname, transformData, generateGraph};
