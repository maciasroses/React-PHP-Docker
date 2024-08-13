import AccountingCardSkeleton from "./AccountingCardSkeleton";

const AccountingListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <AccountingCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default AccountingListSkeleton;
