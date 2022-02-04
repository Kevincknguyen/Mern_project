import React from 'react';
import StyledVid from './VidStyle'

const Video = () => {
    return (
    // <div style={{ flex:4, overflow:"scroll", overflowX:"hidden"}}>
    //     <iframe width="100%" height="90%" src="https://www.youtube.com/embed/5qap5aO4i9A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

    //     </iframe>
    //     <div>Test</div>
    //     <div>Test</div>
    //     <div>Test</div>
    //     <div>Test</div>
    //     <div>Test</div>
    //     <div>Test</div>
    // </div>)
    <StyledVid>
        <iframe style={{margin:"20px"}} width="100%" height="80%" src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div style={{margin:"15px"}}>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>

        </div>


        
    </StyledVid>)
};

export default Video;
