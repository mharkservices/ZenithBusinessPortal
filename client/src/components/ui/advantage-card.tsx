interface AdvantageItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface AdvantageCardProps {
  advantage: AdvantageItem;
}

const AdvantageCard = ({ advantage }: AdvantageCardProps) => {
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

export default AdvantageCard;
