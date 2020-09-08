import { useState } from 'react';
import { colorSpectrumArray, SpectrumColor } from 'shared/theme/types';


//TODO: Decide if this is needed?

/**
 * A hook function for using the available colors on the spectrum array
 * from the theme.
 *
 * First value in array is the cu
 */
const useColorSpectrum = (): [() => SpectrumColor] => {
   const colors = colorSpectrumArray;

   const [index, setColorIndex] = useState(0);

   const incrementIndex = () => {
      const newValue = index >= colors.length - 1 ? 0 : index + 1;
      setColorIndex(newValue);
   };

   const fetchColor = () => {
      const color = colors[index];
      incrementIndex();
     return color;
   }

   return [fetchColor];
};

export default useColorSpectrum;
