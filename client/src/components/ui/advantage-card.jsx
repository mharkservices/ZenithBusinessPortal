import PropTypes from 'prop-types';

const AdvantageCard = ({ advantage }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <i className={`${advantage.icon} text-primary text-xl`}></i>
      </div>
      <h3 className="font-poppins font-semibold text-xl mb-3">{advantage.title}</h3>
      <p className="text-[#6c757d]">{advantage.description}</p>
    </div>
  );
};

AdvantageCard.propTypes = {
  advantage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired
};

export default AdvantageCard;
