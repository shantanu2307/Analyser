import { Chart, registerables } from 'chart.js';
import { useContext, useEffect, useRef } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';
import "../../styles/DoughnutChart.css";
import { renderBar } from '../../utility/graphUtility';

// Register the component with the chart.js library
Chart.register(...registerables);

/**
 * Function to generate doughnut shaped graph from data
 * @param {Array} data Array of objects containing data for the chart
 * @param {titles} titles Chart Title 
 * @returns JSX for the chart
 */
function Bar({ data, title}) {
    const {darkMode}=useContext(ThemeContext);
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
    const divRef=useRef();
    const id = makeid(100);
    useEffect(() => {
        const n=Math.min(30,data.result.length);
        data.result=data.result.slice(0,n);
        // We get the initial configuration of the chart
        const cfg = renderBar(data.result, title, data.type,darkMode);
        const div=divRef.current;
        div.innerHTML=`<canvas id=${id} />`

        //Render the chart
        const chart = new Chart(document.getElementById(id).getContext('2d'), cfg);

        // Cleanup function to remove the legend element and the chart
        return () => {
            chart.destroy();
            div.innerHTML="";
        }
    }, [data, title,id,darkMode]);


    return (
        <>
            <div className='final-graph'>
                <div ref={divRef} className='bar'>
                </div>
            </div>
        </>
        )
}

export default Bar;