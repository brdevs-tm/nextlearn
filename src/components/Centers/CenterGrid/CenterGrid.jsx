import CenterCard from "../CenterCard/CenterCard";

export default function CenterGrid({ centers }) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      {centers.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 py-12">
          <p className="text-lg sm:text-xl">Hech qanday markaz topilmadi.</p>
          <p className="text-sm sm:text-base mt-2">
            Filtrlarni o‘zgartirib ko‘ring!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {centers.map((center) => (
            <CenterCard key={center.id} center={center} />
          ))}
        </div>
      )}
    </div>
  );
}
