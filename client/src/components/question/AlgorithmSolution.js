import React, { Fragment, useState } from 'react'

const AlgorithmSolution = ({ question: { solution } }) => {

    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(solution?.solutionCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500); // Reset copied state after 1.5 seconds
    };

    
    return <Fragment>
        <div className='description'>
            <div>Description</div>
            { solution?.description }
        </div>

        <div className='code-solution mt-5 p-3' style={{ backgroundColor: 'black', padding: '10px', color: 'white' }}>
            <div className='implementation-header d-flex justify-content-between'>
                <div>Code Implementation</div>
                <div onClick={copyToClipboard} className='pointer'>
                   <i className={`bi ${isCopied ? 'bi-clipboard2-check' : 'bi-clipboard' }`}></i> 
                </div>
            </div>
            <div className='pt-3'>
                <code >{solution?.solutionCode}</code>
            </div>
        </div>

        <div className='relevant links mt-5'>
            <div>Relevant Resources</div>
            <ul className='py-3'>
                { 
                    solution.relevantResources && solution.relevantResources.length === 0 ? (<h6>There are no relevant resources for this question</h6>) :
                    (solution.relevantResources.map(resource => (<li> 
                        <a href={resource} className='text-cool'> { resource } </a> 
                        </li>)))
                }
            </ul>
        </div>

    </Fragment>


}


export default AlgorithmSolution