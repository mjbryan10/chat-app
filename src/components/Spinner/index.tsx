import React from 'react';
import './styles.css';
//TODO: Add spinner styles and functionality.

/**
* Usage under MIT lisence
* @see https://epic-spinners.epicmax.co/
* @see https://github.com/epicmaxco/epic-spinners
*/

/**
 * A Loading spinner component
 */
const Spinner = () => {
   return (
      <div className="container">
         <div className="self-building-square-spinner">
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square clear"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square clear"></div>
            <div className="square"></div>
            <div className="square"></div>
         </div>
      </div>
   );
};

export default Spinner;
