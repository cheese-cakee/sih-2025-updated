interface Props {
  title: string;
  value: string | number;
}

const DashboardCard = ({ title, value }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default DashboardCard;
