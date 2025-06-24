import PropTypes from 'prop-types';
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

AspectRatio.propTypes = {
  ratio: PropTypes.number,
  children: PropTypes.node
};

export { AspectRatio }
