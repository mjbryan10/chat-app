import { useState } from 'react';
import { colorSpectrumArray, SpectrumColor } from 'theme/@types';


//TODO: Decide if this is needed?

/**
 * A hook function for using the available colors on the spectrum array
 * from the theme.
 *
 * First value in array is the cu
 */
const useColorSpectrum = (): [() => SpectrumColor, ()=> void] => {
   const colors = colorSpectrumArray;

   const [index, setColorIndex] = useState(-1);

   const incrementIndex = () => {
      const newValue = index >= colors.length - 1 ? 0 : index + 1;
      setColorIndex(newValue);
   };

   const fetchColor = () => {
     return colors[index] || colors[0];
   }

   return [fetchColor, incrementIndex];
};

export default useColorSpectrum;
