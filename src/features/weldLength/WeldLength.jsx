import React, {useEffect} from 'react';
import axios from 'axios';
import { useState } from 'react';

const WeldLength = () => {
    const [weldItems, setWeldItem] = useState({})
    const [needsRefresh, setNeedsRefresh] = useState(true)
    const [inchesOfWeld, setInchesOfWeld] = useState(0);
    const [filter, setFilter] = useState({
        type: 'all'
    })

    const fetchWeldItem = async () => {
        let weldedPart = await axios.get('http://192.168.0.239:6969/welds')
        
        return weldedPart;
    }
    const getWeldItem = async () => {
        const weldedParts = await fetchWeldItem();
        const filteredParts = weldedParts.data.filter(detail => {
            if(filter.type === 'all'){return detail}
            return detail.type === filter.type
        })
        setWeldItem(filteredParts);
    }
    
    
    useEffect(() => {
        if(needsRefresh){
            getWeldItem();
            setNeedsRefresh(false)
        }
    },[needsRefresh])
    const handleChangeFilter = (target, value) => {
        let newFilter = {...filter}
        newFilter[target] = value;
        setFilter(newFilter)
        setNeedsRefresh(true);
    }
    const submitItem = async () => {
        const updatedPart = await axios.put(`http://192.168.0.239:6969/welds/${weldItems._id}`, {inchesOfWeld: inchesOfWeld * weldItems.qty})

        setNeedsRefresh(true);
    }   

    const getTimeBetween = (time1, time2) => {
        const dateTime1 = new Date(time1)
        const dateTime2 = new Date(time2)
        const timeBetween = dateTime2.getTime() - dateTime1.getTime()
        const timeBetweenInSeconds = timeBetween/1000
        
        return timeBetweenInSeconds
    }
    const MappedWeldItems = () => {
        let totalTimesWeld = 0;
        let totalTimesFit = 0;
        let totalItemsWeld = 0;
        let totalItemsFit = 0;
        let totalInchesWeld = 0
        weldItems.map(item => {
            const timeBetweenWeld = getTimeBetween(item.weldStart,item.weldEnd)
            const timeBetweenFit = getTimeBetween(item.fitStart, item.fitEnd)
            if(timeBetweenWeld > 0 && timeBetweenWeld < 36000 ){
                totalTimesWeld += timeBetweenWeld 
                totalItemsWeld += item.qty
                totalInchesWeld += item.weldLength
            }
            if(timeBetweenFit > 0 && timeBetweenFit < 36000 ){
                totalTimesFit += timeBetweenFit 
                totalItemsFit += item.qty 
            }
            // console.log(totalTimes, item);
        })
        let averageTimesWeld = totalTimesWeld/(totalItemsWeld || 1)
        let averageTimesFit = totalTimesFit/(totalItemsFit || 1) 
        console.log(averageTimesWeld, averageTimesFit)
        return {
            weldTime: averageTimesWeld,
            fitTime: averageTimesFit
        }
    }
    const averageTimes = weldItems[0] ? MappedWeldItems() : null
    return (
        <div>
            {/* {JSON.stringify(weldItem)}<br/> */}
            
            {/* <h3>Type: {weldItem[0].type}<br/></h3>
            <h3>Detail: {weldItem[0].detail}<br/></h3>
            <h3>Quanity: {weldItem[0].qty}<br/></h3>
            <h3>Release: {weldItem[0].release}<br/></h3>  
            Inches Of weld: <input type='number' value={inchesOfWeld} onChange={(event) => setInchesOfWeld(event.target.value) } ></input>
        <button onClick={() => submitItem()}>Submit</button> */}
            <select name="types" id="types" onChange={(event) => handleChangeFilter('type', event.target.value)}>
                <option value={'strutBracket'}>Strut Bracket</option>
                <option value={'stanchionTop'}>Stanchion Top</option>
                <option value={'stanchionBase'}>Stanchion Base</option>
                <option value={'fixedStanchion'}>Fixed Stanchion</option>
                <option value={'saddleBase'}>Saddle Base</option>
                <option value={'hingeFitting'}>Hinge Fitting</option>
                <option value={'gussetClamp'}>Gusset Clamp</option>
                <option value={'hssColumn'}>Hss Column</option>
                <option value={'angleBracket'}>Angle Bracket</option>
                <option value={'ceilingAttachment'}>Ceiling Attachment</option>
                <option value={'misc'}>Misc</option>
            </select>
            {
                averageTimes ?
                <React.Fragment>
                    <h3>Weld Average: {averageTimes.weldTime/60 } Mins</h3>
                    <h3>Fit Average: {averageTimes.fitTime/60} Mins </h3>
                </React.Fragment>:
                null
            }
            
        </div>
    )
}

export default WeldLength;